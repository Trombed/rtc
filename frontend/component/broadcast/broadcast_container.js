import {connect} from 'react-redux'
import { streamOn, streamOff} from '../../actions/stream_actions'
import Broadcast from './broadcast'

const mSTP = (state) => ({
    curUserName: Object.values(state.entities.users)[0].username,
    curUserId: Object.values(state.entities.users)[0].id,
    stream: state.streams
})

const mDTP = dispatch => ({
    streamOn: (stream) => dispatch(streamOn(stream)),
    streamOff: (stream) => dispatch(streamOff(stream))
})

export default connect(
    mSTP, 
    mDTP
)(Broadcast)