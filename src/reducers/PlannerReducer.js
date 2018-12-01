import { PLANNER_FETCH_SUCCESS, PLANNER_FETCH_FAILURE, PLANNER_FETCH } from '../actions/types';
// initial state of reducer
const INITIAL_STATE = {
  loading: false,
  courses: {},
};
// reducer to return state for planner actions
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // update state to loading true when fetching data from firebase
    case PLANNER_FETCH:
      return { ...state, loading: true };
    // turn off loading and update courses on fetch success
    case PLANNER_FETCH_SUCCESS:
      return { courses: action.payload, loading: false };
    // turn off loading and return current state on fetch failure
    case PLANNER_FETCH_FAILURE:
      return { ...state, loading: false };
    // return current state on unknown action
    default:
      return state;
  }
};
