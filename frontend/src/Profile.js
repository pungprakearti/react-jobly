import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import JoblyApi from './JoblyApi';
import ErrorHandler from './ErrorHandler';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      photo_url: '',
      password: '',
      _token: '',
      error: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      let payload = jwt.decode(localStorage.getItem('token'));
      let user = await JoblyApi.getUser(payload.username);
      user._token = localStorage.getItem('token');
      this.setState(st => ({ ...st, ...user }));
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

  async handleSubmit(evt) {
    try {
      this.setState({
        error: []
      });
      evt.preventDefault();
      let { username, jobs, error, ...userData } = this.state;
      let user = await JoblyApi.updateUser(userData, username);
      this.setState(st => ({ ...st, ...user }));
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

  render() {
    return (
      <div>
        <h3>Username</h3>
        <p>{this.state.username}</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            value={this.state.first_name}
            name="first_name"
            onChange={this.handleChange}
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            value={this.state.last_name}
            name="last_name"
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
          <label htmlFor="photo_url">Photo URL</label>
          <input
            type="url"
            value={this.state.photo_url}
            name="photo_url"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Re-enter Password</label>
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
          <button>Save Changes</button>
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

export default Profile;
