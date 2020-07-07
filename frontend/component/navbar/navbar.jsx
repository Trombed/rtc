import React from 'react'
import { Link } from 'react-router-dom';







class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }


 

    getUser() {
        if (this.props.session.id === null) {
            return (
                <div className="nav-bar-container">
                    <div>
                        <div className="nav-bar-login" onClick={ () => this.props.openModal('signup') }> 
                        Register
                        </div> 
                    </div>
                    <div className="nav-bar-divider"></div>
                    <div>
                        <div className="nav-bar-login" onClick={ () => this.props.openModal('login') }>
                            Sign In
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="nav-bar-container">
                    <div>
                    <Link to='/profile'> Broadcast</Link>

                    </div>
                    <div className='nav-bar-login' onClick={() => this.props.logout()}>
                    LOGOUT
                    </div>
           
                </div>
            )
        }
    }

    render() {
        return(
            <div className="nav-bar">
                {this.getUser()}
              
            </div>
        )
    }
}

export default NavBar