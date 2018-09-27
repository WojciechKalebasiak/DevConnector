import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";
class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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
    const edu = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(edu, this.props.history);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, course that you have atttended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  error={errors.school}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  error={errors.degree}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="* Fields of study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
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
                    Current school
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  error={errors.description}
                  info="tell us about the program in which you participated"
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
AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  addEducation: (education, history) =>
    dispatch(addEducation(education, history))
});
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEducation)
);
