import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import { Redirect } from 'react-router-dom';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let token = await JoblyApi.signUp(this.state);
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
        <label htmlFor="first_name">First Name: </label>
        <input
          type="text"
          value={this.state.first_name}
          name="first_name"
          onChange={this.handleChange}
        />
        <label htmlFor="last_name">Last Name: </label>
        <input
          type="text"
          value={this.state.last_name}
          name="last_name"
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          value={this.state.email}
          name="email"
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default SignUpForm;
