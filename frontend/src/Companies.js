import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      companies: [],
      resultCompanies: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async componentDidMount() {
    let companies = await JoblyApi.getCompanies();
    this.setState({
      companies,
      resultCompanies: companies
    });
  }

  handleClick(evt) {
    this.setState({
      resultCompanies: this.state.companies.filter(company =>
        company.name.toLowerCase().includes(this.state.search.toLowerCase())
      )
    });
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
        <button onClick={this.handleClick}>Search</button>
        <ul>
          {this.state.resultCompanies.map(company => (
            <Link to={`/companies/${slugify(company.name.toLowerCase())}`}>
              <li>
                {company.name}
                {company.description}
                <img src={company.logo_url} alt="Company" />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default Companies;
