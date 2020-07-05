import {connect} from 'react-redux'
import { getStream} from "../../actions/channel_action"
import Channel from './channel'

const mSTP = (state) => ({
    channel: state.watch
})

const mDTP = dispatch => ({
    getStreamId: channel => dispatch(getStream(channel)),
})

export default connect(
    mSTP, 
    mDTP
)(Channel)