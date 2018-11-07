import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      resultJobs: [],
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let jobs = await JoblyApi.getJobs();
    this.setState({ jobs, resultJobs: jobs });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSearch() {
    console.log(this.state.search);
    this.setState({
      resultJobs: this.state.jobs.filter(job =>
        job.title.toLowerCase().includes(this.state.search.toLowerCase())
      )
    });
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
          {this.state.resultJobs.map(job => (
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

export default Jobs;
