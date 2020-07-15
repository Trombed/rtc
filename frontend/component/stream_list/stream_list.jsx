
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
            // console.log("live channel update connected")
        },
            disconnected: () => { },
            received: data => { 
                this.updateChannels(data) 
            }
        })
     
    }



    componentWillUnmount() {
       
        App.cable.subscriptions.remove(this.subscribe)
    }

    componentDidUpdate(prevProps) {

        if (this.props.channels !== prevProps.channels) {
            this.updateChannels(this.props.channels)
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
                       pathname: `${channel.userName}`
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