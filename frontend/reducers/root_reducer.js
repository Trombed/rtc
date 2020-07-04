import { sessionReducer } from "./session_reducer";
import { combineReducers } from "redux";
import {LOGOUT_CURRENT_USER } from '../actions/session_action'
import entitiesReducer from "./entities_reducer";
import ui from './ui_reducer';
import errors from './errors_reducer';
import streamReducers from './streams_reducer'
import channelReducers from './channels_reducer'

const appReducer = combineReducers({
    session: sessionReducer,
    entities: entitiesReducer,
    streams: streamReducers,
    errors,
    channels: channelReducers,
    ui
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_CURRENT_USER) {
      state = undefined;
    }
    return appReducer(state, action)
  }
  
export default rootReducer