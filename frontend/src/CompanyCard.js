import React, { Component } from 'react';

class CompanyCard extends Component {
  render() {
    return (
      <div>
        {this.props.company.name}
        {this.props.company.description}
        <img src={this.props.company.logo_url} alt="Company" />
      </div>
    );
  }
}

export default CompanyCard;
