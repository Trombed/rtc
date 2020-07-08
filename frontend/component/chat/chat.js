import React, { useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';

console.log(`${window.pubnubSubscribeKey}`)

const pubnub = new PubNub({
//   publishKey: "pub-c-fb98643d-9acf-4c6d-9843-711c30e22300",
  publishKey: `${window.pubnubPublishKey}`,
//   subscribeKey: "sub-c-1ccb5194-c0b7-11ea-9208-3200fd38a8e3",
    subscribeKey: `${window.pubnubSubscribeKey}`,
  uuid: "user-1",
});

const channels = ['awesomeChannel'];

const Chat = (props) => {
  console.log(props)
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = message => {
    pubnub.publish(
      {
        channel: channels[0],
        message
      },
      () => setMessage('')
    );
  };
  
  return (
    <PubNubProvider client={pubnub}>
      <div className="Chat">
        <header className="Chat-header">
          <PubNubConsumer>
            {client => {
              client.addListener({
                message: messageEvent => {
                  addMessage([...messages, messageEvent.message]);
                },
              });

              client.subscribe({ channels });
            }}
          </PubNubConsumer>
          <div
            style={{
              width: '500px',
              height: '300px',
              border: '1px solid black',
            }}
          >
            <div style={{ backgroundColor: 'grey' }}> Chat</div>
            <div
              style={{
                backgroundColor: 'white',
                height: '260px',
                overflow: 'scroll',
              }}
            >
                
              {
                  messages.map((message, messageIndex) => {
                 
                return (
                  <div
                    key={`message-${messageIndex}`}
                    style={{
                      display: 'inline',
                      float: 'left',
                      backgroundColor: '#eee',
                      color: 'black',
                      borderRadius: '20px',
                      margin: '5px',
                      padding: '8px 15px',
                    }}
                  >
                    {message}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: 'flex',
                height: '40px',
                backgroundColor: 'lightgrey',
              }}
            >
              <input
                type="text"
                style={{
                  borderRadius: '5px',
                  flexGrow: 1,
                  fontSize: '18px',
                }}
                placeholder="Type your message"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button className="Chat-Send"
                onClick={e => {
                  e.preventDefault();
                  sendMessage(message);
                }}
              >
                CHAT
              </button>
            </div>
          </div>
        </header>
      </div>
    </PubNubProvider>
  );
}

export default Chat;