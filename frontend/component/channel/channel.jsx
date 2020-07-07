import React from 'react';
import { broadcastData, JOIN_CALL, LEAVE_CALL, EXCHANGE, ice } from '../../util/video_util.js';

class VideoCall extends React.Component{
    
  constructor(props){
    super(props);
    this.pcPeers = {};
    this.userId = Math.floor(Math.random() * 10000);

  }
  componentDidMount(){
    this.props.getStreamId(this.props.match.params.id)
    this.joinCall()
  }

  componentWillUnmount() {
      this.leaveCall()
  }
  joinCall(e){
    console.log(this.props.channel)
    App.cable.subscriptions.create(
        { channel: "StreamChannel",
            id: this.props.channel
     },
    { connected: () => {
        console.log('CONNECTED');

        broadcastData({ type: JOIN_CALL, from: this.userId, stream_Id: this.props.curUserId });
    },
        received: data => {

            console.log("RECEIVED: ", data);

            if (data.from === this.userId) return;

            switch (data.type) {
                case JOIN_CALL:
                    return this.join(data);
                case EXCHANGE:
                    if (data.to !== this.userId) return;
                    return this.exchange(data);
                case LEAVE_CALL:
                    return this.removeUser(data);
                default:
                    return;
            }
        }
    });  
  }
  
  join(data){
    this.createPC(data.from, true)
  }
  removeUser(data){
      let video = document.getElementById(`remoteVideoContainer+${data.from}`);
      video && video.remove();

      let peers = this.pcPeers
      delete peers[data.from]
  }
  
  createPC(userId, offerBool){
    const pc = new RTCPeerConnection(ice);

    this.pcPeers[userId] = pc;
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
        broadcastData({
            type: EXCHANGE,
            from: this.userId,
            to: userId,
            sdp: JSON.stringify(e.candidate)
        })
    };
    pc.ontrack = (e) => {
        let remoteVid = document.getElementById('remote-video')

        remoteVid.autoplay = "autoplay";
        remoteVid.srcObject = e.streams[0];

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
  leaveCall(e){
      const pcKeys = Object.keys(this.pcPeers);
      for (let i = 0; i < pcKeys.length; i++) {
          this.pcPeers[pcKeys[i]].close();
      }
      this.pcPeers = {};
      this.localVideo.srcObject.getTracks().forEach(function (track) {
          track.stop();
      })
      this.localVideo.srcObject = null;
      App.cable.subscriptions.subscriptions = [];
      this.remoteVideoContainer.innerHTML = "";
        broadcastData({
            type: LEAVE_CALL,
            from: this.userId
        });
  }
    
  
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
    render(){
        return(<div className="VideoCall">
                    <div id="remote-video-container">
                        Watching
                        <video id="remote-video" autoPlay controls></video>
                    </div>
                   
                </div>)
    }
}
export default VideoCall;




