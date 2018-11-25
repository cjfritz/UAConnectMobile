import { PLANNER_FETCH_SUCCESS, PLANNER_FETCH_FAILURE, PLANNER_FETCH } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  courses: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLANNER_FETCH:
      return { ...state, loading: true };
    case PLANNER_FETCH_SUCCESS:
      return { courses: action.payload, loading: false };
    case PLANNER_FETCH_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
