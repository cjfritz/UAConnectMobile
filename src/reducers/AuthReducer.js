import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
} from '../actions/types';

// used to avoid state being undefined (throwing error)
const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: false,
  loading: false,
};
// return proper state based on action and payload
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // change the email field state
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    // change password field state
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    // update state completely on login user success
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        error: false,
      };
    // update state upon failing to login
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: true };
    // update state when user logs int
    case LOGIN_USER:
      return { ...state, loading: true, error: false };
    // update state when user logs out
    case LOGOUT_USER:
      return { ...state, loading: true };
    // update state when user logout is successful
    case LOGOUT_USER_SUCCESS:
      return { ...state, loading: false };
    // update state when user logout is unsuccessful
    case LOGOUT_USER_FAIL:
      return { ...state, loading: false };
    // return default state on unknown action
    default:
      return state;
  }
};
