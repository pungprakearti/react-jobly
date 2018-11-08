import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-text">
          <h1 className="Home-header">jobly</h1>
          <p>All the jobs in one, convenient place.</p>
          <h2>Welcome Back!</h2>
        </div>
      </div>
    );
  }
}

export default Home;
