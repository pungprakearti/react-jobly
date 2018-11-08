import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      company: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /** get default jobs available from company */
  async componentDidMount() {
    let company = await JoblyApi.getCompany(this.props.match.params.handle);
    this.setState({
      jobs: company.jobs,
      company
    });
  }

  /** search jobs */
  async handleClick(id) {
    await JoblyApi.apply(id);
    let jobIdx = this.state.jobs.findIndex(job => job.id === id);
    let job = this.state.jobs[jobIdx];
    job.state = 'applied';
    console.log(job);
    this.setState(st => ({
      jobs: [...st.jobs.slice(0, jobIdx), job, ...st.jobs.slice(jobIdx + 1)]
    }));
  }

  render() {
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
