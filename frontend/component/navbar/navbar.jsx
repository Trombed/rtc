import React from 'react'
import { Link } from 'react-router-dom';







class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }


 

    getUser() {
        if (this.props.session.id === null) {
            return (
                <div>
                    <div>
                        <button onClick={ () => this.props.openModal('signup') }> 
                        Register
                        </button> 
                    </div>

                    <div>
                        <button onClick={ () => this.props.openModal('login') }>
                            Sign In
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={() => this.props.logout()}>
                    LOGOUT
                    </button>
                    <br/>
                    <Link to='/profile'> Profile</Link>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.getUser()}
              
            </div>
        )
    }
}

export default NavBar