import {connect} from 'react-redux'
import { streamChannels} from '../../actions/stream_actions'
import StreamList from './stream_list'

const mSTP = (state) => ({
    channels: state.channels
})

const mDTP = dispatch => ({
    streams: () => dispatch(streamChannels()),

})

export default connect(
    mSTP, 
    mDTP
)(StreamList)