
import React from 'react';
import { Link } from 'react-router-dom'


class StreamList extends React.Component {
    constructor(props) {
        super(props) 
        this.state = { channels: [] } 
    }

    componentDidMount() {
        this.props.streams()
     
        this.subscribe = App.cable.subscriptions.create({
        channel: "LiveChannel"
        },{
            connected: () => {  
            console.log("live channel update connected")
        },
            disconnected: () => { },
            received: data => { 
                this.updateChannels(data) 
            }
        })
     
    }



    componentWillUnmount() {
        this.props.streams()
        App.cable.subscriptions.remove(this.subscribe)
    }

    componentWillReceiveProps(prevProps) {
        if (this.props.channels !== prevProps.channels) {
           
            this.setState({ channels: prevProps.channels})
        }

     
    }

    updateChannels(data) {
        this.setState({ channels: data})
    }


    render() {
        
        this.channels = this.state.channels.map( (channel, index) => {
         
            return (
                <div key={index}>
                   <Link to={{
                       pathname: `${channel.userName}`,
                       state: {
                           streamId: `${channel.streamId}`
                        }
                   }}> 
                       {channel.userName} is LIVE:  session: {channel.id}
                    </Link>
                </div>
            )
        })

        return(
            <div className='stream-list'>
                <div className='stream-list-header'>
                Live: 
                </div>
               
                {this.channels}
            </div>
            
        )
    }
}

export default StreamList