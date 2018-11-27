import * as types from '../actions/types';
import reducer from './PlannerReducer';

const INITIAL_STATE = {
  loading: false,
  courses: {},
};

describe('Planner Reducer', () => {
  it('should update state properly with PLANNER_FETCH action', () => {
    expect(reducer(undefined, {
      type: types.PLANNER_FETCH,
    })).toEqual({
      ...INITIAL_STATE,
      loading: true,
    });
  });

  it('should update state properly with PLANNER_FETCH_SUCCESS action', () => {
    const payload = {
      uid1: {
        course: 'testCourse',
        description: 'someDescription',
        grade: 4.0,
        term: 'testTerm',
        units: 4,
      },
    };
    expect(reducer(undefined, {
      type: types.PLANNER_FETCH_SUCCESS,
      payload,
    })).toEqual({
      courses: payload,
      loading: false,
    });
  });

  it('should update state properly with PLANNER_FETCH_FAILURE acton', () => {
    expect(reducer(undefined, {
      types: types.PLANNER_FETCH_FAILURE,
    })).toEqual({
      ...INITIAL_STATE,
      loading: false,
    });
  });
});
