import streamAPIUtil from '../util/stream_util'

export const LIVE_ON = 'LIVE_ON';
export const LIVE_OFF = 'LIVE_OFF';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'

const liveOn = stream => {
  return {
    type: LIVE_ON,
    stream
  };
};

const liveOff = stream => {
  return {
    type: LIVE_OFF,
    stream
  };
};

const receiveChannels = (payload) =>{
    return {
        type: RECEIVE_CHANNELS,
        payload
    }
}


export const streamOn = (stream) => (dispatch) => {
    streamAPIUtil.streamOn(stream)
        .then( (stream) => dispatch(liveOn(stream)))
}

export const streamOff = (stream) =>  (dispatch) => {
    streamAPIUtil.streamOff(stream)
        .then( (stream) => dispatch(liveOff(stream)))
}



export const streamChannels = () => (dispatch) => {
    streamAPIUtil.streamChannels()
        .then( (channels) => dispatch(receiveChannels(channels)))
}