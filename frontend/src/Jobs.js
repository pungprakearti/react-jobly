import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** get all jobs */
  async componentDidMount() {
    let jobs = await JoblyApi.getJobs();
    this.setState({ jobs });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  /** search for jobs */
  async handleSearch() {
    let jobs = await JoblyApi.getJobs(this.state.search);
    this.setState({ jobs });
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

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          name="search"
          placeholder="Enter search term.."
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
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

export default Jobs;
