import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { getPost, editPost } from "../../actions/postActions";
class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id).then(() => {
      const { post, auth } = this.props;
      if (post.post.user !== auth.user.id) {
        this.props.history.push("/feed");
      } else {
        this.setState({ text: post.post.text });
      }
    });
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
    const upadtedPost = {
      text: this.state.text
    };
    const { id } = this.props.match.params;
    this.props.editPost(id, upadtedPost, this.props.history);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <Link to="/feed" class="btn btn-light mb-3">
          Go back
        </Link>
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Edit your post...
          </div>
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
PostEdit.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post
});
const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPost(id)),
  editPost: (id, data, history) => dispatch(editPost(id, data, history))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEdit);
