import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-text">
          <h1 className="Home-header">jobly</h1>
          <div className="Home-slogan">
            All the jobs in one, convenient place.
          </div>
          {this.props.currUser ? (
            <h2>Welcome Back!</h2>
          ) : (
            <Link to="/login">
              <Button className="Home-login">Login</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
