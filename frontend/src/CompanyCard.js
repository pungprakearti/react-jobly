import React, { Component } from 'react';
import './CompanyCard.css';

class CompanyCard extends Component {
  render() {
    return (
      <div className="row CompanyCard">
        <div className="col-3 CompanyCard-logo-container">
          <img
            className="CompanyCard-logo"
            src={this.props.company.logo_url}
            alt="Company"
          />
        </div>
        <div className="col-9">
          <div className="CompanyCard-name">{this.props.company.name}</div>
          <div className="CompanyCard-desc">
            {this.props.company.description}
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyCard;
