import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }
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
    const { user } = this.props.auth;
    const newPost = {
      avatar: user.avatar,
      name: user.name,
      text: this.state.text
    };
    this.props.addPost(newPost);
    this.setState({ text: "" });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  error={errors.text}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
const mapDispatchToProps = dispatch => ({
  addPost: postData => dispatch(addPost(postData))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
