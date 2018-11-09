import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './JobCard.css';

class JobCard extends Component {
  convSalary(salary) {
    let result = '';
    salary = salary.toString();
    for (let i = salary.length - 1; i >= 0; i--) {
      result = salary[i] + result;
      if ((salary.length - i) % 3 === 0) {
        result = ',' + result;
      }
    }
    if (result[0] === ',') result = result.slice(1);
    return '$' + result;
  }

  render() {
    return (
      <div className="JobCard">
        <h4>{this.props.job.title}</h4>
        <div className="JobCard-se">
          <p className="JobCard-salary">
            {this.convSalary(this.props.job.salary)}
          </p>
          <p className="JobCard-equity">
            {parseInt(this.props.job.equity * 100)}%
          </p>
        </div>
        <Button
          onClick={() => this.props.handleClick(this.props.job.id)}
          disabled={this.props.job.state === 'applied'}
          className="JobCard-button"
          id={this.props.job.state === 'applied' ? '' : 'JobCard-active'}
        >
          {this.props.job.state === 'applied' ? 'Applied' : 'Apply'}
        </Button>
      </div>
    );
  }
}

export default JobCard;
