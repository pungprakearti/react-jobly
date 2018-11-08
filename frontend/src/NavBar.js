import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import './NavBar.css';

class NavBar extends Component {
  render() {
    let loggedInBar = (
      <Navbar className="NavBar-custom">
        <div className="col text-left">
          <NavLink to="/" className="NavBar-link NavBar-link-home">
            jobly
          </NavLink>
        </div>
        <NavLink to="/companies" className="NavBar-link">
          Companies
        </NavLink>
        <NavLink to="/jobs" className="NavBar-link">
          Jobs
        </NavLink>
        <NavLink to="/profile" className="NavBar-link">
          Profile
        </NavLink>
        <NavLink
          onClick={() => this.props.setCurrUser()}
          to="/"
          className="NavBar-link"
        >
          Log out
        </NavLink>
      </Navbar>
    );

    let loggedOutBar = (
      <Navbar className="NavBar-custom">
        <NavLink to="/" className="NavBar-link NavBar-link-home">
          jobly
        </NavLink>
        <NavLink to="/login" className="NavBar-link">
          Login
        </NavLink>
      </Navbar>
    );

    return <div>{this.props.currUser ? loggedInBar : loggedOutBar}</div>;
  }
}
export default NavBar;
