import {
  ADD_POST,
  PROFILE_LOADING,
  GET_POSTS,
  GET_POST,
  DELETE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return { ...state, posts: [action.payload, ...state.posts] };
    }
    case PROFILE_LOADING:
      return { ...state, loading: true };
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST:
      return { ...state, post: action.payload, loading: false };
    case DELETE_POST:
      return { ...state, posts: state.posts.filter(post => post._id !== action.id) };
    default:
      return state;
  }
};
export default postReducer;
