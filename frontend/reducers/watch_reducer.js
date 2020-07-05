import { RECEIVE_STREAM } from "../actions/channel_action";

const watchReducers = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_STREAM:
      return  action.stream.id
    default:
      return state
  }
}

export default watchReducers;