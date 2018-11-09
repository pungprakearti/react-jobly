import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Login from './Login';
import Profile from './Profile';
import NavBar from './NavBar';
import JoblyApi from './JoblyApi';
import ErrorHandler from './ErrorHandler';
import jwt from 'jsonwebtoken';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: [],
      currUser: null
    };
    this.setCurrUser = this.setCurrUser.bind(this);
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem('token');
      if (token) {
        await this.setCurrUser(token);
      }
    } catch (err) {
      this.setState(st => ({
        error: Array.isArray(err)
          ? [...st.error, ...err]
          : [...st.error, err.message]
      }));
    }
  }

  async setCurrUser(token) {
    if (token) {
      let payload = jwt.decode(token);
      let user = await JoblyApi.getUser(payload.username);
      this.setState({
        currUser: user
      });
    } else {
      this.setState({
        currUser: null
      });
      localStorage.removeItem('token');
    }
  }

  render() {
    return (
      <div>
        <NavBar currUser={this.state.currUser} setCurrUser={this.setCurrUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home currUser={this.state.currUser} />}
          />
          <Route exact path="/companies" render={() => <Companies />} />
          <Route
            exact
            path="/companies/:handle"
            render={props => <Company {...props} />}
          />
          <Route exact path="/jobs" render={() => <Jobs />} />
          <Route
            exact
            path="/login"
            render={props => (
              <Login setCurrUser={this.setCurrUser} {...props} />
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => <Profile currUser={this.state.currUser} />}
          />
          <Route
            render={() => (
              <ErrorHandler
                error={
                  this.state.error.length
                    ? this.state.error
                    : ['Error 404 Page Not Found!']
                }
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
