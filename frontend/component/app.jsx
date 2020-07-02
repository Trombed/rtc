import React from 'react';
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import {Switch} from 'react-router-dom'
import NavBar from './navbar/navbar_container'
import Modal from './modals/modal'
import Main from './main/main'
import Profile from './profile/profile';

const App = () => (
    <div className="App">
        <Modal />
        <NavBar />
        <Switch>
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Main />
        
        </Switch>
        
    </div>
)

export default App
