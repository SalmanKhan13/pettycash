import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteOnlineservices } from "../../actions/profileActions";

class Onlineservices extends Component {
  onDeleteClick(id) {
    this.props.deleteOnlineservices(id);
  }

  render() {
    const onlineservices = this.props.onlineservices.map(onservices => (
      <tr key={onservices._id}>
        <td>
          <Moment format="YYYY/MM/DD">{onservices.date}</Moment>
        </td>
        <td>{onservices.description}</td>
        <td>{onservices.onlinecategory}</td>
        <td>{onservices.cost}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, onservices._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Online Bills</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Cost</th>
              <th />
            </tr>
            {onlineservices}
          </thead>
        </table>
      </div>
    );
  }
}

Onlineservices.propTypes = {
  deleteOnlineservices: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteOnlineservices }
)(Onlineservices);
