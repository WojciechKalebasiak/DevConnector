import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";
export const postLoading = () => ({
  type: POST_LOADING
});
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const getPosts = () => dispatch => {
  dispatch(postLoading());
  axios
    .get("/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};
export const getPost = postId => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(postLoading());
    axios
      .get(`/api/posts/${postId}`)
      .then(res => {
        dispatch({ type: GET_POST, payload: res.data });
        resolve();
      })
      .catch(err => dispatch({ type: GET_POST, payload: null }));
  });
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        id
      });
    })
    .catch(err => dispatch({ GET_ERRORS, payload: err.response.data }));
};
export const editPost = (id, updatedPost, history) => dispatch => {
  axios
    .put(`/api/posts/${id}`, updatedPost)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      history.push("/feed");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const likePost = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => console.log(err.response.data));
};
export const dislikePost = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => console.log(err.response.data));
};
export const addComment = (id, data) => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post(`/api/posts/comment/${id}`, data)
    .then(res => {
      dispatch({ type: GET_POST, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const deleteComment = (commentId, postId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
