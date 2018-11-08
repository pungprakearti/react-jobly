import React, { Component } from 'react';

class JobCard extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.job.title}</h4>
        <p>Salary: {this.props.job.salary}</p>
        <p>Equity: {this.props.job.equity}</p>
        <button
          onClick={() => this.props.handleClick(this.props.job.id)}
          disabled={this.props.job.state === 'applied'}
        >
          {this.props.job.state === 'applied' ? 'Applied' : 'Apply'}
        </button>
      </div>
    );
  }
}

export default JobCard;
