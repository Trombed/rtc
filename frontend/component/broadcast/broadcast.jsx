import React from 'react';
import { broadcastData, JOIN_CALL, LEAVE_CALL, EXCHANGE, ice } from '../../util/video_util.js';
import VideoPlayer from '../video_player/video_player'


const videoJsOptions = {
    autoplay: true,
    controls: false,

  }

class Broadcast extends React.Component{
    
  constructor(props){
    super(props);
    this.pcPeers = {};
    this.userId = this.props.curUserId;
    this.channelInfo = { user_id: this.props.curUserId }
    this.state = { streamLive: false }
  }
  componentDidMount(){

  }

  componentWillUnmount() {
    if(this.state.streamLive) { 
        this.props.streamOff(this.channelInfo)  
        App.cable.subscriptions.remove(this.subscribe)
    }
 
  }

  getCamera() {
    this.remoteVideoContainer = document.getElementById("remote-video-container")
    if (navigator.mediaDevices === undefined) { 
        navigator.mediaDevices = {}; 
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                
                    if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }
                    return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                    });
            }
        }
    
    navigator.mediaDevices.getUserMedia( { audio: false, video: true })
    .then(stream => {
        this.localStream = stream;
        
        document.getElementById("local-video_html5_api").srcObject = stream;
        debugger
        
    }).catch(error => { console.log(error) });
  }


  joinCall(e){
    this.getCamera();
    this.subscribe = App.cable.subscriptions.create(
        { channel: "StreamChannel",
            id: this.props.curUserId
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
        broadcastData({
            type: EXCHANGE,
            from: this.userId,
            to: userId,
            sdp: JSON.stringify(e.candidate)
        })
    };
    pc.ontrack = (e) => {

      
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
      let video = document.getElementById("local-video_html5_api")
        if (video.srcObject.getTracks()) {
            video.srcObject.getTracks().forEach((track) => {
                track.stop();
            video.srcObject = null;

            })
        }
      App.cable.subscriptions.remove(this.subscribe);
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
                
                    {/* <video className="video-player" id="local-video" controls autoPlay
                    height="500px"
                    ></video> */}
                    <VideoPlayer { ...videoJsOptions } />
                    

                   
                    
                    <button onClick={ () => {
                            this.joinCall()
                            this.props.streamOn(this.channelInfo)
                    }}>
                            LIVE</button>
                    
                    <button onClick={ () => {
                        this.leaveCall()
                        this.props.streamOff(this.channelInfo)
                        }}>Offline</button>
                        
   
                      
                </div>)
    }
}
export default Broadcast;


