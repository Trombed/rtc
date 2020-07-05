import {joinStream} from "../util/channel_util"

export const RECEIVE_STREAM = "RECEIVE_STREAM"

const receiveStream = (stream) => ({
    type: RECEIVE_STREAM,
    stream
})

export const getStream = (stream) => (dispatch) => (
    joinStream(stream)
        .then(res => dispatch(receiveStream(res)))
)