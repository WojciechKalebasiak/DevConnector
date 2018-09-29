import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { deletePost, likePost, dislikePost } from "../../actions/postActions";
class PostItem extends Component {
  handleDelete = id => {
    this.props.deletePost(id);
  };
  handleEdit = id => {
    this.props.history.push(`/post/update/${id}`);
  };
  likePost = id => {
    this.props.likePost(id);
  };
  dislikePost = id => {
    this.props.dislikePost(id);
  };
  findUserLike = () => {
    let liked;
    const { likes } = this.props.post;
    const { user } = this.props.auth;
    likes.forEach(like => {
      if (like.user === user.id) {
        liked = true;
      }
    });
    return liked ? true : false;
  };
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center"><strong>{post.name}</strong></p>
          </div>

          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.likePost(post._id)}>
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike()
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.dislikePost(post._id)}>
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={() => this.handleDelete(post._id)}
                    type="button"
                    className="btn btn-danger mr-1">
                    <i className="fas fa-times" />
                  </button>
                ) : null}
                {post.user === auth.user.id ? (
                  <button
                    onClick={() => this.handleEdit(post._id)}
                    type="button"
                    className="btn btn-primary mr-1">
                    <i className="fas fa-sm fa-edit" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  likePost: id => dispatch(likePost(id)),
  dislikePost: id => dispatch(dislikePost(id))
});
const mapStateToProps = state => ({
  auth: state.auth
});
PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired
};
PostItem.defaultProps = {
  showActions: true
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostItem)
);
