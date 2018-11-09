import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import ErrorHandler from './ErrorHandler';
import Loading from './Loading';
import './Company.css';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      company: {},
      error: [],
      loading: true
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
        company,
        loading: false
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
      let jobIdx = this.state.jobs.findIndex(job => job.id === id);
      let job = this.state.jobs[jobIdx];
      job.loading = true;
      this.setState(st => ({
        jobs: [...st.jobs.slice(0, jobIdx), job, ...st.jobs.slice(jobIdx + 1)]
      }));
      await JoblyApi.apply(id);

      job.loading = false;
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
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="Company">
        <div className="Company-content">
          <h3>{this.state.company.name}</h3>
          <p>{this.state.company.description}</p>
          {this.state.jobs.map(job => (
            <div key={job.id} className="Company-job">
              <JobCard job={job} handleClick={this.handleClick} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Company;
