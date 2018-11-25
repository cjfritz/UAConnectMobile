import {
  PLANNER_CREATE,
  PLANNER_UPDATE,
  PLANNER_SAVE_SUCCESS,
  PLANNER_SAVE_FAILURE,
  PLANNER_CLEAR,
  PLANNER_VALID_UPDATE,
} from '../actions/types';
import { mockCourses, terms } from '../assets/fixtures/FormFixtures';

export const getTermYearRange = () => {
  const termYears = [];
  const year = new Date().getFullYear();
  for (let i = year - 15; i < year + 15; i += 1) {
    termYears.push(`${i}`);
  }
  return termYears;
};

const INITIAL_STATE = {
  course: '',
  description: '',
  term: '',
  grade: '',
  units: '',
  validFields: {
    validCourse: true,
    validDescription: true,
    validTerm: true,
    validGrade: true,
    validUnits: true,
  },
  mockCourses,
  terms,
  termYears: getTermYearRange(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLANNER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PLANNER_VALID_UPDATE:
      return { ...state, validFields: { ...state.validFields, [action.payload.prop]: action.payload.value } };
    case PLANNER_SAVE_SUCCESS:
    case PLANNER_CLEAR:
    case PLANNER_CREATE:
      return INITIAL_STATE;
    case PLANNER_SAVE_FAILURE:
    default:
      return state;
  }
};
