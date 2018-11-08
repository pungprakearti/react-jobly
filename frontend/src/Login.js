import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }

  handleLogin(login) {
    this.setState({ login });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleLogin(true)}>Login</button>
        <button onClick={() => this.handleLogin(false)}>Sign Up</button>
        {this.state.login ? (
          <LoginForm
            setCurrUser={this.props.setCurrUser}
            history={this.props.history}
          />
        ) : (
          <SignUpForm
            setCurrUser={this.props.setCurrUser}
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}

export default Login;
