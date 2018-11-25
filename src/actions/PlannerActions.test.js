import firebase from 'firebase';
import * as actions from './PlannerActions';
import * as types from './types';
// import firebaseMock from './FirebaseMocks';

// jest.mock('firebase', () => {
//   return firebaseMock;
// });

// const ref = jest.fn();

// const ref = jest.fn(url => {
//   return {
//     on: () => jest.fn(),
//   };
// });

jest.spyOn(firebase, 'initializeApp')
  .mockImplementation(() => {
    return {
      auth: () => {
        return jest.fn();
      },
      database: () => {
        return jest.fn();
      },
    };
  });

jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true,
    },
  };
});

jest.spyOn(firebase, 'database').mockImplementation(() => {
  return {
    ref: () => jest.fn().mockImplementation(() => {
      return {
        on: () => jest.fn().mockImplementation(() => {
          return true;
        }),
      };
    }),
  };
});

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

// describe('course planner fetch action creator', () => {
//   beforeEach(() => {
//     jest.useFakeTimers();
//   });

//   it('can properly fetch course data', async () => {
//     // jest.mock('firebase');
//     expect.assertions(3);
//     const mockDispatch = jest.fn();
//     const fetch = actions.plannerFetch();
//     const course = {
//       course: 'CSCE 1212',
//       description: 'Programming Class',
//       grade: 3.5,
//       term: 'Fall 2018',
//       units: 3,
//     };

//     // const database = firebase.database.mockImplementation(() => jest.fn());
//     // const ref = database.ref.mockImplementation(() => jest.fn());
//     // const on = ref.on.mockImplementation(() => jest.fn());

//     // firebase.database.ref.on.mockImplementation(() => {
//     //   return jest.fn();
//     // });

//     fetch(mockDispatch);
//     expect(mockDispatch.mock.calls[0][0]).toEqual({ type: types.PLANNER_FETCH });
//     jest.clearAllTimers();
//     expect(firebase.auth).toHaveBeenCalled();
//     expect(firebase.database.ref.on).toHaveBeenCalled();
//     // expect(firebase.database.ref.on).toHaveBeenCalled();
//   });
// });
