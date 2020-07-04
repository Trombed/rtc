import React from 'react'

class Channel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <video className="video-player" id="video-player" autoPlay controls></video>
                
            </div>
        )
    }
}

export default Channel;