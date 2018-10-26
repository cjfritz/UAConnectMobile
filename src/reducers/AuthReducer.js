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

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        error: false,
      };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: true };
    case LOGIN_USER:
      return { ...state, loading: true, error: false };
    case LOGOUT_USER:
      return { ...state, loading: true };
    case LOGOUT_USER_SUCCESS:
      return { ...state, loading: false };
    case LOGOUT_USER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
