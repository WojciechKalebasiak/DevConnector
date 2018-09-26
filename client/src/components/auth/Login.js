import React, { Component } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';
//Redux
import { connect } from "react-redux";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors
      };
    }
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard');
    }
    return null;
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(credentials);
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup placeholder="Email Address" value={this.state.email} name="email" onChange={this.handleInput} error={errors.email}/>
                <TextFieldGroup type="password" value={this.state.password} placeholder="Password" name="password" onChange={this.handleInput} error={errors.password}/>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(loginUser(credentials))
});
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
