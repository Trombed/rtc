import { RECEIVE_CHANNELS} from "../actions/stream_actions.js";

const channelReducers = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHANNELS:

      return  action.payload
    default:
      return state
  }
}

export default channelReducers;