import React, { Component } from 'react';
import './ErrorHandler.css';

class ErrorHandler extends Component {
  render() {
    return (
      <div className="ErrorHandler">
        {this.props.error.map(error => (
          <h1 key={error}>{error}</h1>
        ))}
      </div>
    );
  }
}

export default ErrorHandler;
