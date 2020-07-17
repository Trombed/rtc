import { closeModal } from '../../../actions/modal_actions';
import EditProfile from './profile_modal'
import { connect } from 'react-redux';
import { updateProfile} from '../../../actions/session_action'

const mSTP = (state) => ({
    session: state.session,
    user: state.entities.users
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    updateProfile: (user) => dispatch(updateProfile(user))
})



export default connect(
    mSTP, 
    mDTP
)(EditProfile)

