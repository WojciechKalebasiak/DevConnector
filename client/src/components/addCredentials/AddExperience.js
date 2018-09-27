import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";
class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }
  handleCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.errors !== state.errors) {
      return {
        errors: nextProps.errors
      };
    }
    return null;
  }
  handleSubmit = e => {
    e.preventDefault();
    const exp = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(exp, this.props.history);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  error={errors.title}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  error={errors.lcoation}
                  onChange={this.handleChange}
                />
                <h6>From date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  error={errors.from}
                  onChange={this.handleChange}
                />
                <h6>To date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  error={errors.to}
                  onChange={this.handleChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  error={errors.description}
                  info="Tell us about your job"
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
AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  addExperience: (experience, history) =>
    dispatch(addExperience(experience, history))
});
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddExperience)
);
