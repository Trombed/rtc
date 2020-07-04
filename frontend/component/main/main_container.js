import {connect} from 'react-redux'
import { streamChannels} from '../../actions/stream_actions'
import Main from './main'

const mSTP = (state) => ({
    channels: state.channels
})

const mDTP = dispatch => ({
    streams: () => dispatch(streamChannels()),

})

export default connect(
    mSTP, 
    mDTP
)(Main)