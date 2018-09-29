import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";
class Education extends Component {
  handleDelete = id => {
    this.props.delete(id);
  };
  render() {
    const education = this.props.edu.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
          {" - "}
          {edu.current ? "Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(edu._id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="education d-none d-md-block">
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Fields of study</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  delete: id => dispatch(deleteEducation(id))
});
Education.propTypes = {
  edu: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired
};
export default connect(
  null,
  mapDispatchToProps
)(Education);
