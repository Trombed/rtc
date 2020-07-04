
import React from 'react'



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
                    {channel.userName} is LIVE:  {channel.streamId}: 
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