import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ERRORS:
      return {
        ...action.payload
      };
    case CLEAR_ERRORS:
      return null;
  }
};
export default errorReducer;
