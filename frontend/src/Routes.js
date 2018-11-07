import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
// import Jobs from './Jobs';
// import Login from './Login';
// import Profile from './Profile';
// import NavBar from './NavBar';
import JoblyApi from './JoblyApi';
import slugify from 'slugify';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      jobs: []
    };
  }

  async componentDidMount() {
    let companies = await JoblyApi.getCompanies();
    let jobs = await JoblyApi.getJobs();
    this.setState({
      companies,
      jobs
    });
  }

  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/companies" render={() => <Companies />} />
          <Route
            exact
            path="/companies/:handle"
            render={props => <Company {...props} />}
          />
          {/* <Route exact path="/jobs" render={() => <Jobs />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/profile" render={() => <Profile />} /> */}
        </Switch>
      </div>
    );
  }
}

export default Routes;
