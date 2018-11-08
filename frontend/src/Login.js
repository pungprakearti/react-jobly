import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { Button } from 'reactstrap';
import './Login.css';

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
      <div className="Login">
        <div className="Login-content">
          <div className="Login-button-group">
            <Button
              onClick={() => this.handleLogin(true)}
              className={`Login-button ${
                this.state.login ? '' : 'Login-button-active'
              }`}
              disabled={this.state.login}
            >
              Login
            </Button>
            <Button
              onClick={() => this.handleLogin(false)}
              className={`Login-button ${
                !this.state.login ? '' : 'Login-button-active'
              }`}
              disabled={!this.state.login}
            >
              Sign Up
            </Button>
          </div>
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
      </div>
    );
  }
}

export default Login;
