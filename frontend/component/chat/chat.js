import React from 'react'


class Chat extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      message: "",
      userId: (this.props.userId || -1),
      userName: this.props.userName,
      chatId: this.props.chatChannel
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.messages = []
    
  }

  componentDidMount() {

    App.chatSubscribe = App.cable.subscriptions.create({
      channel: "ChatChannel",
      chatId: this.props.chatChannel,
      user_id: this.props.userId,
      user_name: this.props.userName
      },{
          connected: () => {  
        
      },  
          disconnected: () => { 
            App.cable.subscriptions.remove(this.chatSubscribe)
          },
          received: data => { 
   
              this.updateChat(data)
          }
      })
      
   
  }

  componentWillUnmount() {
    // App.cable.subscriptions.remove(this.chatSubscribe)
  }

  updateChat(data) {
    let chatContainer = document.getElementById("Chat-Messages-Container")
 
    var message = document.createElement("li")
    message.classList.add("individual-messages")

    var user = document.createElement("span")
    user.classList.add("chat-user-name")
    user.innerHTML = `${data.userName}: `
    
    var sentence = document.createElement("span")
    sentence.classList.add("chat-user-message")
    sentence.innerHTML = `&nbsp${data.message}`

    message.appendChild(user)
    message.appendChild(sentence)

    chatContainer.appendChild(message)
    if (chatContainer.childElementCount > 100) {
      chatContainer.removeChild(chatContainer.childNodes[0])
    }

    chatContainer.scrollTop = chatContainer.scrollHeight

  }


  updateMessage(e) {
    this.setState({message: e.target.value})
  }

  sendMessage() {
    // if (this.state.message.length <= 0) return;
    this.props.sendMessage(this.state);
  
    this.messages.push(this.state.message)
    this.index = this.messages.length;
    this.setState({message: ""})
  }

  keyCheck(e) {
    if (e.keyCode === 13) {
      this.sendMessage()
    }
    if (e.keyCode === 38) {
      if (this.index <= 0) return;
      if (this.messages.length > 0) {
        this.index--;
        this.setState({ message: this.messages[this.index]})
      }
       
    }
    if (e.keyCode === 40 ){
      if (this.index > this.messages.length-1) return;
      if (this.index === this.messages.length-1) {
        this.setState({message: ""})

      } else {
        this.index++;
        this.setState({message: this.messages[this.index]})
      }    
    }  
  }

  resetCounter() {
    this.index = this.messages.length;
  }



  render() {
    return (
      <div className="chat-container">
        <div className="chat-top">
          <div className="chat-header">
            Channel: {this.props.chatChannel}
          </div>
          <div className="chat-messages-container"   id="Chat-Messages-Container">
            <li>
              Welcome to the chat room...
            </li>
          </div>
        </div>
        <div className="chat-bottom">
          <input type="text" 
                  className="chat-input"
                  value={this.state.message}
                  placeholder="Type your messages..."
                  onKeyDown={ e => this.keyCheck(e)}
                  onChange={ e => this.updateMessage(e)
                  }
                  onFocus={ () => this.resetCounter() }
       
          > 
          </input>
          <button className="chat-send-button" 
            onClick={ e => {
            e.preventDefault();
            this.sendMessage()
          }}>
            CHAT
          </button>
        </div>

      </div>
    )
  }
}

export default Chat 