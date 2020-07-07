import React from 'react';
import {ProtectedRoute} from '../util/route_util'
import {Switch, Route} from 'react-router-dom'
import NavBar from './navbar/navbar_container'
import Modal from './modals/modal'
import StreamList from './stream_list/stream_list_container'
import BroadcastContainer from './broadcast/broadcast_container';
import ChannelContainer from './channel/channel_container';
import Main from './main/main'


const App = () => (
    <div className="App">
        <Modal />
        <NavBar />
        <div className="body-divider">

            <StreamList />
            <Switch>
                <ProtectedRoute exact path="/profile" component={BroadcastContainer} />
                <Route path="/:id" component={ChannelContainer} />
                <Route path="/" component={Main} />
            </Switch>

        </div>
        
    </div>
)

export default App
