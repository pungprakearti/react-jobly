import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let token = await JoblyApi.login(this.state);
    console.log(token);
    localStorage.setItem('token', token);
    this.props.history.push('/jobs');
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
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
    );
  }
}

export default LoginForm;
