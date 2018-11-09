import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import ErrorHandler from './ErrorHandler';
import { Button, Input } from 'reactstrap';
import Loading from './Loading';

import './Jobs.css';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      search: '',
      error: [],
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** get all jobs */
  async componentDidMount() {
    try {
      let jobs = await JoblyApi.getJobs();
      this.setState({ jobs, loading: false });
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
  async handleSearch(evt) {
    evt.preventDefault();
    this.setState({ loading: true });
    try {
      let jobs = await JoblyApi.getJobs(this.state.search);
      this.setState({ jobs, loading: false });
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

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
    if (this.state.error.length > 0) {
      return <ErrorHandler error={this.state.error} />;
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="Jobs">
        <div className="Jobs-content">
          <div className="Jobs-search row text-center">
            <form className="row" onSubmit={this.handleSearch}>
              <Input
                type="text"
                value={this.state.search}
                name="search"
                placeholder="Enter search term.."
                onChange={this.handleChange}
                className="Jobs-input"
              />
              <Button id="Jobs-search-button">Search</Button>
            </form>
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
