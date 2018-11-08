import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import ErrorHandler from './ErrorHandler';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      companies: [],
      error: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  /** get all companies as default */
  async componentDidMount() {
    try {
      let companies = await JoblyApi.getCompanies();
      this.setState({ companies });
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

  /** search for companies */
  async handleClick(evt) {
    try {
      let companies = await JoblyApi.getCompanies(this.state.search);
      this.setState({
        companies
      });
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
        <input
          type="text"
          value={this.state.search}
          name="search"
          placeholder="Enter search term.."
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Search</button>
        <ul>
          {this.state.companies.map(company => (
            <Link key={company.handle} to={`/companies/${company.handle}`}>
              <li>
                <CompanyCard company={company} />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default Companies;
