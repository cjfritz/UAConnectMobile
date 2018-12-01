import {
  PROFILE_UPDATE, PROFILE_FETCH, PROFILE_FETCH_SUCCESS, PROFILE_SAVE_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  name: '',
  address: '',
  phone: '',
  standing: '',
  expectedGraduation: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PROFILE_FETCH:
      return { ...state, loading: true };
    case PROFILE_FETCH_SUCCESS:
      return { ...action.payload, loading: false };
    case PROFILE_SAVE_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
