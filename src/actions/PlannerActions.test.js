import * as actions from './PlannerActions';
import * as types from './types';

describe('synchronous course planner action creators', () => {
  it('can dispatch clear action correctly', () => {
    expect(actions.plannerClear()).toEqual({
      type: types.PLANNER_CLEAR,
    });
  });

  it('can dispatch update action correctly', () => {
    const payload = {
      prop: 'someProp',
      value: 'someValue',
    };

    expect(actions.plannerUpdate(payload)).toEqual({
      type: types.PLANNER_UPDATE,
      payload,
    });
  });
});

describe('plannerValidUpdate action creator', () => {
  it('can dispatch correct action with correct payload for invalid grade', () => {
    const payload = {
      prop: 'grade',
      value: 'test',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validGrade', value: false },
    });
  });

  it('can dispatch correct action with correct payload for valid grade', () => {
    const payload = {
      prop: 'grade',
      value: '',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validGrade', value: true },
    });
  });

  it('can dispatch correct action with correct payload for invalid units', () => {
    const payload = {
      prop: 'units',
      value: 'test',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validUnits', value: false },
    });
  });

  it('can dispatch correct action with correct payload for valid units', () => {
    const payload = {
      prop: 'units',
      value: '',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validUnits', value: true },
    });
  });

  it('can dispatch correction action with correct payload for valid term', () => {
    const payload = {
      prop: 'term',
      value: 'Fall Semester - 2018',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validTerm', value: true },
    });
  });

  it('can dispatch correction action with correct payload for invalid term', () => {
    let payload = {
      prop: 'term',
      value: ' - 2018',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validTerm', value: false },
    });

    payload = {
      prop: 'term',
      value: 'Fall Semester - ',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validTerm', value: false },
    });

    payload = {
      prop: 'term',
      value: ' - ',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validTerm', value: false },
    });
  });

  it('can dispatch correct action with correct payload for invalid anything else', () => {
    const payload = {
      prop: 'course',
      value: '',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validCourse', value: false },
    });
  });

  it('can dispatch correct action with correct payload for valid anything else', () => {
    const payload = {
      prop: 'term',
      value: 'Fall Semester - 2009',
    };
    expect(actions.plannerValidUpdate(payload)).toEqual({
      type: types.PLANNER_VALID_UPDATE,
      payload: { prop: 'validTerm', value: true },
    });
  });
});
