import React, { Component } from 'react';

class ErrorHandler extends Component {
  render() {
    return (
      <div>
        {this.props.error.map(error => (
          <h1 key={error}>{error}</h1>
        ))}
      </div>
    );
  }
}

export default ErrorHandler;
