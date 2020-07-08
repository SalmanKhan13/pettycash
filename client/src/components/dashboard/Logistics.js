import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteLogistics } from "../../actions/profileActions";

class Logistics extends Component {
  onDeleteClick(id) {
    this.props.deleteLogistics(id);
  }

  render() {
    const logistics = this.props.logistics.map(logts => (
      <tr key={logts._id}>
        <td>
          <Moment format="YYYY/MM/DD">{logts.date}</Moment>
        </td>
        <td>{logts.description}</td>
        <td>{logts.logisticscategory}</td>
        <td>{logts.cost}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, logts._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Logistics Bills</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Cost</th>
              <th />
            </tr>
            {logistics}
          </thead>
        </table>
        
      </div>
    );
  }
}

Logistics.propTypes = {
  deleteLogistics: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteLogistics }
)(Logistics);
