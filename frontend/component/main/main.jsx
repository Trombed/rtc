
import React from 'react';
import { Link } from 'react-router-dom'


class Main extends React.Component {
    constructor(props) {
        super(props)    
    }

    componentDidMount() {
        this.props.streams()
    }


    render() {
        let channels = this.props.channels.map( (channel, index) => {
         
            return (
                <div key={index}>
                   <Link to={{
                       pathname: `${channel.userName}`,
                       state: {
                           streamId: `${channel.streamId}`
                        }
                   }}> 
                       {channel.userName} is LIVE:  session: {channel.streamId}
                    </Link>
                </div>
            )
        })

        return(
            <div>
                Main
                {channels}
            </div>
            
        )
    }
}

export default Main