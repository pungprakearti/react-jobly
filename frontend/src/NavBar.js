import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    let loggedInBar = (
      <div>
        <NavLink to="/">Jobly</NavLink>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/">Log out</NavLink>
      </div>
    );

    let loggedOutBar = (
      <div>
        <NavLink to="/">Jobly</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    );

    return <div>{this.props.currUser ? loggedInBar : loggedOutBar}</div>;
  }
}
export default NavBar;
