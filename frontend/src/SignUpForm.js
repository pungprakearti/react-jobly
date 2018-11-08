import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import ErrorHandler from './ErrorHandler';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
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
      let token = await JoblyApi.signUp(state);
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
        {this.state.error !== '' ? (
          <ErrorHandler error={this.state.error} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default SignUpForm;
