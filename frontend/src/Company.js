import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import ErrorHandler from './ErrorHandler';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      company: {},
      error: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /** get default jobs available from company */
  async componentDidMount() {
    try {
      let company = await JoblyApi.getCompany(this.props.match.params.handle);
      let jobs = await JoblyApi.getJobs();
      jobs = jobs.filter(job => job.company_handle === company.handle);
      this.setState({
        jobs: jobs,
        company
      });
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

  /** search jobs */
  async handleClick(id) {
    try {
      await JoblyApi.apply(id);
      let jobIdx = this.state.jobs.findIndex(job => job.id === id);
      let job = this.state.jobs[jobIdx];
      job.state = 'applied';
      this.setState(st => ({
        jobs: [...st.jobs.slice(0, jobIdx), job, ...st.jobs.slice(jobIdx + 1)]
      }));
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

  render() {
    if (this.state.error.length) {
      return <ErrorHandler error={this.state.error} />;
    }
    return (
      <div>
        <h3>{this.state.company.name}</h3>
        <p>{this.state.company.description}</p>
        <ul>
          {this.state.jobs.map(job => (
            <li>
              <JobCard job={job} handleClick={this.handleClick} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Company;
