import { HashRouter } from "react-router-dom";
import App from "./app";
import React from "react";
import { Provider } from "react-redux";
import {UserProvider} from "../usercontext/user-context"

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </HashRouter>
  </Provider>
);


export default Root