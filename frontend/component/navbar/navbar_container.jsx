import {connect} from 'react-redux'
import {openModal} from '../../actions/modal_actions'
import {logout } from '../../actions/session_action'
import NavBar from './navbar'

const mSTP = (state) => ({
    session: state.session,

    
})

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal)),
    logout: () => dispatch(logout())
})

export default connect(
    mSTP, 
    mDTP
)(NavBar)