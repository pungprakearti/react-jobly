import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      company: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(id) {
    await JoblyApi.apply(id);
    let jobIdx = this.state.jobs.findIndex(job => job.id === id);
    let job = this.state.jobs[jobIdx];
    job.state = 'applied';
    this.setState(st => ({
      jobs: [...st.jobs.slice(0, jobIdx), job, ...st.jobs.slice(jobIdx + 1)]
    }));
  }

  async componentDidMount() {
    let jobs = await JoblyApi.getJobs();
    let company = await JoblyApi.getCompany(this.props.match.params.handle);
    jobs = jobs.filter(
      job => job.company_handle === this.props.match.params.handle
    );
    this.setState({
      jobs,
      company
    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.company.name}</h3>
        <p>{this.state.company.description}</p>
        <ul>
          {this.state.jobs.map(job => (
            <li>
              <h4>{job.title}</h4>
              <p>Salary: {job.salary}</p>
              <p>Equity: {job.equity}</p>
              <button
                onClick={() => this.handleClick(job.id)}
                disabled={job.state === 'applied'}
              >
                {job.state === 'applied' ? 'Applied' : 'Apply'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Company;
