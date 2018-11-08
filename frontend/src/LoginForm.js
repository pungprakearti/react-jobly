import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import ErrorHandler from './ErrorHandler';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(evt) {
    try {
      this.setState({
        error: []
      });
      evt.preventDefault();
      let { error, ...state } = this.state;
      let token = await JoblyApi.login(state);
      localStorage.setItem('token', token);
      this.props.setCurrUser(token);
      this.props.history.push('/jobs');
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        {this.state.error.length > 0 ? (
          <ErrorHandler error={this.state.error} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default LoginForm;
