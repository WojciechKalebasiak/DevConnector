import { REGISTER_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload
      };
  }
};
export default authReducer;
