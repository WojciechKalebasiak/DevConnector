import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/profileActions";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getCurrentUser())
});
export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
