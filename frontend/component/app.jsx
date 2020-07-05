import React from 'react';
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import {Switch, Route} from 'react-router-dom'
import NavBar from './navbar/navbar_container'
import Modal from './modals/modal'
import MainContainer from './main/main_container'
import ProfileContainer from './profile/profile_container';
import ChannelContainer from './channel/channel_container'

const App = () => (
    <div className="App">
        <Modal />
        <NavBar />
        <Switch>
            <ProtectedRoute exact path="/profile" component={ProfileContainer} />
            <Route path="/:id" component={ChannelContainer} />
        
        </Switch>

        <MainContainer />
        
    </div>
)

export default App
