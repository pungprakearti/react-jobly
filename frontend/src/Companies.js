import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import ErrorHandler from './ErrorHandler';
import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import './Companies.css';
import Loading from './Loading';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      companies: [],
      error: [],
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.setState({ companies, loading: false });
    } catch (err) {
      this.setState(st => ({
        error: [...st.error, ...err]
      }));
    }
  }

  /** search for companies */
  async handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ loading: true });
    try {
      let companies = await JoblyApi.getCompanies(this.state.search);
      this.setState({
        companies,
        loading: false
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
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="Companies">
        <div className="Companies-content">
          <div className="Companies-search row text-center">
            <form className="row" onSubmit={this.handleSubmit}>
              <Input
                type="text"
                value={this.state.search}
                name="search"
                placeholder="Enter search term.."
                onChange={this.handleChange}
                className="Companies-input"
              />
              <Button id="Companies-search-button">Search</Button>
            </form>
          </div>
          <div className="row justify-content-center">
            {this.state.companies.length ? (
              <ListGroup className="Companies-list">
                {this.state.companies.map(company => (
                  <Link
                    className="Companies-link"
                    key={company.handle}
                    to={`/companies/${company.handle}`}
                  >
                    <ListGroupItem className="Companies-list-item">
                      <CompanyCard company={company} />
                    </ListGroupItem>
                  </Link>
                ))}
              </ListGroup>
            ) : (
              <h1>No Companies Found</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Companies;
