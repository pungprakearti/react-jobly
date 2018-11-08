import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import ErrorHandler from './ErrorHandler';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './SignUpForm.css';

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
      <div className="SignUpForm">
        <Form onSubmit={this.handleSubmit} className="SignUpForm-form">
          <FormGroup className="row">
            <Label htmlFor="username">Username: </Label>
            <Input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="row">
            <Label htmlFor="password">Password: </Label>
            <Input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="row">
            <Label htmlFor="first_name">First Name: </Label>
            <Input
              type="text"
              value={this.state.first_name}
              name="first_name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="row">
            <Label htmlFor="last_name">Last Name: </Label>
            <Input
              type="text"
              value={this.state.last_name}
              name="last_name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="row">
            <Label htmlFor="email">Email: </Label>
            <Input
              type="email"
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button className="SignUpForm-button">Submit</Button>
        </Form>

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
