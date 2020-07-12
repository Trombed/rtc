import {connect} from 'react-redux'
import Chat from './chat'
import {sendMessage} from '../../util/chat_util'

const mSTP = (state) => ({
    userName: Object.values(state.entities.users)[0].username,
    userId: Object.values(state.entities.users)[0].id
    
})

const mDTP = dispatch => ({
    sendMessage: (message) => sendMessage(message)
})


export default connect(
    mSTP, 
    mDTP
)(Chat)