import {
  PROFILE_UPDATE, PROFILE_FETCH, PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAILURE,
} from '../actions/types';
// initial state for profile state
const INITIAL_STATE = {
  loading: false,
  name: '',
  address: '',
  phone: '',
  standing: '',
  expectedGraduation: '',
};
// reducer to return updated state for profile
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // update state for specific props to profile
    case PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    // set loading to true and return current state on firebase fetch
    case PROFILE_FETCH:
      return { ...state, loading: true };
    // return updated profile fields and set loading false for successful fetch
    case PROFILE_FETCH_SUCCESS:
      return { ...action.payload, loading: false };
    // return current state and set loading false for fetch failure
    case PROFILE_FETCH_FAILURE:
      return { ...state, loading: false };
    // return current state on unkown action
    default:
      return state;
  }
};
