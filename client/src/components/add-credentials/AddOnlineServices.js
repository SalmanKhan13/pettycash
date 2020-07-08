import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SelectListGroup from '../common/SelectListGroup';
import { addOnlineService } from "../../actions/profileActions";

class AddOnlineServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      description: "",
      quantity: "",
      onlinecategory:"",
      cost:"",

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

    const onlineServicesData = {
      date: this.state.date,
      description: this.state.description,
      quantity: this.state.quantity,
      onlinecategory:this.state.onlinecategory,
      cost:this.state.cost
    };

    this.props.addOnlineService(onlineServicesData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    // Select options for status
    const options = [
      { label: '* Select category of onlinebills', value: 0 },
      { label: 'Aws', value: 'Aws' },
      { label: 'Alibaba', value: 'Alibaba' },
      { label: 'Udemy', value: 'Udemy' },
      { label: 'Rozee', value: 'Rozee' },
      { label: 'Lynda', value: 'Lynda' },
      { label: 'Facebook', value: 'Facebook' },
      { label: 'Googleapps', value: 'Googleapps' },
      { label: 'Digitalocean', value: 'Digitalocean' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="add-onlineservices">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add OnlineServices</h1>
              <p className="lead text-center">
                Add any Online bills etc that you have paid
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
                  placeholder="OnlineCategory"
                  name="onlinecategory"
                  value={this.state.onlinecategory}
                  onChange={this.onChange}
                  options={options}
                  error={errors.onlinecategory}
                  info="Select an option to submit your online bills"
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

AddOnlineServices.propTypes = {
  addOnlineService: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addOnlineService }
)(withRouter(AddOnlineServices));
