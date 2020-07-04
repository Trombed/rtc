import { LIVE_ON, LIVE_OFF} from "../actions/stream_actions.js";

const streamReducers = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case LIVE_ON:

      return  action.stream

    case LIVE_OFF:
      return {live: false}
    default:
      return {live: false}
  }
}

export default streamReducers;