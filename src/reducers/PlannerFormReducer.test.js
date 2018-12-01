import * as types from '../actions/types';
import reducer, { getTermYearRange } from './PlannerFormReducer';
import { mockCourses, terms } from '../assets/fixtures/FormFixtures';

const INITIAL_STATE = {
  course: '',
  description: '',
  term: ' - ',
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

describe('PlannerForm reducer', () => {
  it('should return correct state on PLANNER_UPDATE action', () => {
    expect(reducer(undefined,
      {
        type: types.PLANNER_UPDATE,
        payload: { prop: 'valid', value: false },
      })).toEqual(
      {
        ...INITIAL_STATE,
        valid: false,
      }
    );
  });

  it('should return correct state on PLANNER_VALID_UPDATE action', () => {
    expect(reducer(undefined,
      {
        type: types.PLANNER_VALID_UPDATE,
        payload: { prop: 'validCourse', value: false },
      })).toEqual(
      {
        ...INITIAL_STATE,
        validFields: {
          ...INITIAL_STATE.validFields,
          validCourse: false,
        },
      }
    );
  });

  it('should return correct state on PLANNER_SAVE_SUCCESS action', () => {
    expect(reducer(undefined,
      {
        type: types.PLANNER_SAVE_SUCCESS,
      })).toEqual(
      {
        ...INITIAL_STATE,
      }
    );
  });

  it('should return correct state on PLANNER_CLEAR action', () => {
    expect(reducer(undefined,
      {
        type: types.PLANNER_CLEAR,
      })).toEqual(
      {
        ...INITIAL_STATE,
      }
    );
  });

  it('should return correct state on PLANNER_CREATE action', () => {
    expect(reducer(undefined,
      {
        type: types.PLANNER_CREATE,
      })).toEqual(
      {
        ...INITIAL_STATE,
      }
    );
  });

  it('should return correct state on PLANNER_SAVE_FAILURE action', () => {
    expect(reducer(undefined,
      {
        type: types.PLANNER_SAVE_FAILURE,
      })).toEqual(
      {
        ...INITIAL_STATE,
      }
    );
  });
});
