import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteTravelling } from "../../actions/profileActions";

class Travelling extends Component {
  onDeleteClick(id) {
    this.props.deleteTravelling(id);
  }

  render() {
    const travelling = this.props.travelling.map(travg => (
      <tr key={travg._id}>
        <td>
          <Moment format="YYYY/MM/DD">{travg.date}</Moment>
        </td>
        <td>{travg.description}</td>
        <td>{travg.travellingcategory}</td>
        <td>{travg.cost}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, travg._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Travelling Bills</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Cost</th>
              <th />
            </tr>
            {travelling}
          </thead>
        </table>
      </div>
    );
  }
}

Travelling.propTypes = {
  deleteTravelling: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTravelling }
)(Travelling);
