import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import PostItem from "../posts/PostItem";
import Spinner from "../common/Spinner";
import CommentFrom from "./CommentForm";
import CommentFeed from "./CommentFeed";
class Post extends Component {
  componentDidMount() {
    const { postid } = this.props.match.params;
    this.props.getPost(postid);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentFrom postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments}/>
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPost(id))
});
const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
