import React from 'react';
import videojs from 'video.js'
require('!style-loader!css-loader!video.js/dist/video-js.css')

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }


  render() {
    return (
      <div>	
        <div data-vjs-player>
          <video className="video-player video-js" id="local-video" autoPlay ref={ node => this.videoNode = node }></video>
        </div>
      </div>
    )
  }
}