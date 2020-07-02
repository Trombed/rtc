import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./component/root";
import APIUtil from "./util/session_api_util"


document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  window.logout = APIUtil.logout;
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;

  } else {
    store = configureStore();

  } 
  ReactDOM.render(<Root store={store} />, root);
  window.getState = store.getState

  
});