import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import ErrorHandler from './ErrorHandler';
import { Button, Input } from 'reactstrap';

import './Jobs.css';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      search: '',
      error: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** get all jobs */
  async componentDidMount() {
    try {
      let jobs = await JoblyApi.getJobs();
      this.setState({ jobs });
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  /** search for jobs */
  async handleSearch() {
    try {
      let jobs = await JoblyApi.getJobs(this.state.search);
      this.setState({ jobs });
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

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
    if (this.state.error.length > 0) {
      return <ErrorHandler error={this.state.error} />;
    }
    return (
      <div className="Jobs">
        <div className="Jobs-content">
          <div className="Jobs-search row text-center">
            <Input
              type="text"
              value={this.state.search}
              name="search"
              placeholder="Enter search term.."
              onChange={this.handleChange}
              className="Jobs-input"
            />
            <Button onClick={this.handleSearch} id="Jobs-search-button">
              Search
            </Button>
          </div>
          {this.state.jobs.length ? (
            this.state.jobs.map(job => (
              <div key={job.id} className="Jobs-item">
                <JobCard job={job} handleClick={this.handleClick} />
              </div>
            ))
          ) : (
            <h1>No Jobs Found</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Jobs;
