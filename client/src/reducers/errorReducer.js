import { GET_ERRORS } from "../actions/types";

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ERRORS:
      return {
        ...action.payload
      };
  }
};
export default errorReducer;
