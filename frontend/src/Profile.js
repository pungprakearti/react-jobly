import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import JoblyApi from './JoblyApi';
import ErrorHandler from './ErrorHandler';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Loading from './Loading';
import './Profile.css';

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
      error: [],
      loading: true,
      modified: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      let payload = jwt.decode(localStorage.getItem('token'));
      let user = await JoblyApi.getUser(payload.username);
      user._token = localStorage.getItem('token');
      this.setState(st => ({ ...st, ...user, loading: false }));
    } catch (err) {
      this.setState(st => ({
        error: Array.isArray(err)
          ? [...st.error, ...err]
          : [...st.error, err.message]
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
        error: [],
        modified: false
      });
      evt.preventDefault();
      let {
        username,
        jobs,
        error,
        loading,
        modified,
        ...userData
      } = this.state;
      let user = await JoblyApi.updateUser(userData, username);
      this.setState(st => ({ ...st, ...user, modified: true }));
    } catch (err) {
      err = err.map(e => e.replace('instance.', ''));
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

  render() {
    if (!this.props.currUser) {
      return <ErrorHandler error={['You must authenticate first.']} />;
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="Profile">
        <div className="Profile-content">
          <div className="Profile-username">Username</div>
          <div className="Profile-name">{this.state.username}</div>
          <Form onSubmit={this.handleSubmit} className="Profile-form">
            <FormGroup className="row">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                type="text"
                value={this.state.first_name}
                name="first_name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="row">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                type="text"
                value={this.state.last_name}
                name="last_name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="row">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="row">
              <Label htmlFor="photo_url">Photo URL</Label>
              <Input
                type="url"
                value={this.state.photo_url}
                name="photo_url"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="row">
              <Label htmlFor="password">Change Password</Label>
              <Input
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button className="Profile-button">Save Changes</Button>
          </Form>
        </div>
        {this.state.modified ? (
          <div className="Profile-updated">Profile Updated</div>
        ) : (
          ''
        )}
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
