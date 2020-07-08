import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SelectListGroup from "../common/SelectListGroup";
import { addTravelling } from "../../actions/profileActions";

class AddTravelling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      description: "",
      quantity: "",
      travellingcategory: "",
      cost: "",
      current: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const travellingData = {
      date: this.state.date,
      description: this.state.description,
      quantity: this.state.quantity,
      travellingcategory: this.state.travellingcategory,
      cost: this.state.cost
    };

    this.props.addTravelling(travellingData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    // Select options for status
    const options = [
      { label: "* Select category of Travellingbills", value: 0 },
      { label: "Food", value: "Food" },
      { label: "Accessories", value: "Accessories" },
      { label: "Vehicle Fuel", value: "Vehicle Fuel" },
      { label: "Vehicle Repair", value: "Vehicle Repair" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="add-travelling">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Travelling</h1>
              <p className="lead text-center">
                Add any of Travelling bills etc that you have paid
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="date"
                  type="date"
                  value={this.state.date}
                  onChange={this.onChange}
                  error={errors.date}
                />
                <TextFieldGroup
                  placeholder="* Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextFieldGroup
                  placeholder="* Quantity"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.onChange}
                  error={errors.quantity}
                />
                <SelectListGroup
                  placeholder="Travelling"
                  name="travellingcategory"
                  value={this.state.travellingcategory}
                  onChange={this.onChange}
                  options={options}
                  error={errors.travellingcategory}
                  info="Select an option to submit your travelling bills"
                />
                <TextFieldGroup
                  placeholder="* Cost"
                  name="cost"
                  value={this.state.cost}
                  onChange={this.onChange}
                  error={errors.cost}
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddTravelling.propTypes = {
  addTravelling: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTravelling }
)(withRouter(AddTravelling));
