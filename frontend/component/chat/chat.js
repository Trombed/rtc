import React from 'react'
import {UserConsumer} from '../../usercontext/user-context'

class Chat extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: ""
    }
  }

  componentDidMount() {
    this.chatSubscribe = App.cable.subscriptions.create({
      channel: "LiveChannel",
      chatId: this.props.userId,
      user_id: this.props.userId,
      user_name: this.props.userName
      },{
          connected: () => {  
          console.log("chat channel update connected")
      },
          disconnected: () => { },
          received: data => { 
              this.updateChat(data) 
          }
      })
  }

  componentWillUnmount() {
    App.cable.subscriptions.remove(this.chatSubscribe)
  }

  render() {
    return (
      <div className="chat-container">
        <div>
        Channel: {this.props.userName} {this.props.userId}
        </div>
        <div>
          MESSAGES
        </div>
        <div>
          message to send.
        </div>

      </div>
    )
  }
}

export default Chat 