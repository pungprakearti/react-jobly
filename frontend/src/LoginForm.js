import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import ErrorHandler from './ErrorHandler';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './LoginForm.css';

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
      <div className="LoginForm">
        <Form onSubmit={this.handleSubmit} className="LoginForm-form">
          <FormGroup className="row">
            <Label htmlFor="username">Username: </Label>
            <Input
              className="LoginForm-input"
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="row">
            <Label htmlFor="password">Password: </Label>
            <Input
              className="LoginForm-input"
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button className="LoginForm-button">Submit</Button>
        </Form>
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
