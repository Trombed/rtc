
import React from 'react'
import App from '../app';



class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            video: false,
            streamLive: false
        };
        
        this.channelInfo = {
            user_id: this.props.curUserId
        }
    }

    componentWillUnmount() {
       if(this.state.streamLive) this.props.streamOff(this.channelInfo)
    }

    getUserMedia() {
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
          }
          
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
          
              var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          
              if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
              }
          
              return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
              });
            }
          }
          
          navigator.mediaDevices.getUserMedia({ audio: true, video: true })
          .then(function(stream) {
            var video = document.getElementById("video-player");
            if ("srcObject" in video) {
              video.srcObject = stream;
            } else {
              video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function(e) {
              video.play();
            };
          })
          .catch(function(err) {
            console.log(err.name + ": " + err.message);
          });
          this.setState({
              video: true
          })
    }

    closeStream() {
        var video = document.getElementById("video-player");
        video.srcObject.getTracks().forEach( track => track.stop())
        this.setState({ video: false})
    }

    cameraToggle() {
        if (!this.state.video) {
            return (
                <button onClick={() => this.getUserMedia()}>Open Camera</button>
            )
        } else {
            return (
                <button onClick={() => this.closeStream()}>Close Camera</button>
            )
        }
    }

    beginStream() {
        App.cable.subscriptions.create({
            chanel: `StreamChannel:  ${this.props.streams.id}`
        })
    }

    render() {

        return(
            <div>
                {this.props.curUserName}'s Profile
                <video className="video-player" id="video-player" autoPlay controls></video>
                {this.cameraToggle()}
                <button onClick={() => this.props.streamOn(this.channelInfo)}>
                    GO LIVE
                </button>
                <button onClick={() => this.props.streamOff(this.channelInfo)}>GO OFFLINE</button>
            </div>

            
        )
    }
}

export default Profile