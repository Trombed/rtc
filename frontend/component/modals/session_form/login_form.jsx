import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  renderErrors() {
    return(
      <ul className="login-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        
          <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="login-divider">
            Login
          </div>
   
       
         
          {this.renderErrors()}
          <div className="login-form">
            
            <div>
              Username:
            </div>
            <div>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
                placeholder="Username"
                />
            </div>
          
            <div>
            Password:
            </div>
            <div>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
                placeholder="Password"
                />
            </div>
            <div>
            <input className="session-submit" type="submit" value="Login" />  
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
