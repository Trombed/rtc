import React from 'react'
import {broadcastData, JOIN_CALL, LEAVE_CALL, EXCHANGE, ice} from '../../util/video_util'


class Channel extends React.Component {
    constructor(props) {
        super(props)
        this.pcPeers = {};
        this.userId = Math.floor(Math.random() * 10000);
        this.videoPlayer = document.getElementById("video-player")
    }
    
    componentDidMount() {
       
        this.props.getStreamId(this.props.match.params.id)
            .then( res => this.joinCall())
    }

    componentWillUnmount() {
        this.leaveCall();
    }



    join(data){
        this.createPC(data.from, true)
    }

    joinCall(e){
        console.log("joinCall")
    
        console.log(this.props.channel)
        App.cable.subscriptions.create(
            { channel: "StreamChannel",
                stream_channel: this.props.channel
            },
            { 
              connected: () => {
                console.log("connected")
                broadcastData({ type: JOIN_CALL, from: this.userId});
              },
              received: data  => {
                console.log("RECEIVED: ", data);
                if (data.from === this.userId) return;
                switch(data.type){
                  case JOIN_CALL:
                    return this.join(data);
                  case EXCHANGE:
                    if (data.to !== this.userId) return;
                    return this.exchange(data);
                  case LEAVE_CALL:
                    return this.leaveCall(data);
                  default:
                    return;
                }
              }
        });
    }

    join(data){
        debugger
        console.log(data)
        this.createPC(data.from, true)
    }

    removeUser(data){
        let peers = this.pcPeers
        delete peers[data.from]
    }

    createPC(userId, offerBool){
        const pc = new RTCPeerConnection(ice);
    
        this.pcPeers[userId] = pc;
        this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream));
        if (offerBool) {
            pc.createOffer().then(offer => {
                pc.setLocalDescription(offer).then(() => {
                    setTimeout( ()=>{
                        broadcastData({
                            type: EXCHANGE,
                            from: this.userId,
                            to: userId,
                            sdp: JSON.stringify(pc.localDescription),
                        })
    
                    }, 0);
                })
            })
        }
        pc.onicecandidate = (e) => {
            console.log(e)
            broadcastData({
                type: EXCHANGE,
                from: this.userId,
                to: userId,
                sdp: JSON.stringify(e.candidate)
            })
        };
        pc.ontrack = (e) => {
   
            this.videoPlayer.srcObject = e.streams[0];
        };
        pc.oniceconnectionstatechange = (e) => {
            if (pc.iceConnectionState === 'disconnected') {
                broadcastData({
                    type: LEAVE_CALL,
                    from: userId,
                });
            }
        }
        return pc;
      };


    exchange(data) {
        let pc;
        if (this.pcPeers[data.from]) {
            pc = this.pcPeers[data.from];
        } else {
            pc = this.createPC(data.from, false);
        }
        if (data.candidate) {
            let candidate = JSON.parse(data.candidate)
            pc.addIceCandidate(new RTCIceCandidate(candidate))
        }
        if (data.sdp) {
            const sdp = JSON.parse(data.sdp);
            if (sdp && !sdp.candidate) {
                pc.setRemoteDescription(sdp).then(() => {
                    if (sdp.type === 'offer') {
                        pc.createAnswer().then(answer => {
                            pc.setLocalDescription(answer)
                                .then(() => {
    
                                        broadcastData({
                                            type: EXCHANGE,
                                            from: this.userId,
                                            to: data.from,
                                            sdp: JSON.stringify(pc.localDescription)
                                        });
                                })
                        })
                    }
                })
            }
        }
      }




    leaveCall() {
        const pcKeys = Object.keys(this.pcPeers);
        for (let i = 0; i < pcKeys.length; i++) {
           this.pcPeers[pcKeys[i]].close();
        }
        this.pcPeers = {};    
        this.localVideo.srcObject.getTracks()
         .forEach(function (track) { track.stop(); })
        
        this.localVideo.srcObject = null;
        App.cable.subscriptions.subscriptions = [];
        broadcastData({ type: LEAVE_CALL, from: this.userId });
    }


    render() {
       
        return (
            <div>
                <video className="video-player" id="video-player" autoPlay controls></video>
                
            </div>
        )
    }
}

export default Channel;