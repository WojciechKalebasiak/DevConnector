import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from '../utlis/is-empty';
const initialState = {
  isAuthenticated: false,
  user: {}
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
  }
};
export default authReducer;
