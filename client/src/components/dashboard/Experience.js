import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";
class Experience extends Component {
  handleDelete = id => {
    this.props.delete(id);
  };
  render() {
    const experience = this.props.exp.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          {" - "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(exp._id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="experience">
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  delete: id => dispatch(deleteExperience(id))
});
Experience.propTypes = {
  exp: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired
};
export default connect(
  null,
  mapDispatchToProps
)(Experience);
