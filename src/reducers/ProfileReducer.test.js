import * as types from '../actions/types';
import reducer from './ProfileReducer';

const INITIAL_STATE = {
  loading: false,
  name: '',
  address: '',
  phone: '',
  standing: '',
  expectedGraduation: '',
};

describe('Profile Reducer', () => {
  it('should update the state properly for PROFILE_UPDATE action', () => {
    expect(reducer(undefined, {
      type: types.PROFILE_UPDATE,
      payload: { prop: 'name', value: 'newName' },
    })).toEqual({
      ...INITIAL_STATE,
      name: 'newName',
    });
  });

  it('should update the state properly for PROFILE_FETCH action', () => {
    expect(reducer(undefined, {
      type: types.PROFILE_FETCH,
    })).toEqual({
      ...INITIAL_STATE,
      loading: true,
    });
  });

  it('should update the state properly for PROFILE_FETCH_SUCCESS action', () => {
    const payload = {
      name: 'someName',
      address: 'someAddress',
      phone: 'somePhone',
      standing: 'someStanding',
      expectedGraduation: 'someGraduation',
    };
    expect(reducer(undefined, {
      type: types.PROFILE_FETCH_SUCCESS,
      payload,
    })).toEqual({
      ...INITIAL_STATE,
      ...payload,
      loading: false,
    });
  });

  it('should update the state properly for PROFILE_FETCH_FAILURE action', () => {
    expect(reducer(undefined, {
      types: types.PROFILE_FETCH_FAILURE,
    })).toEqual({
      ...INITIAL_STATE,
      loading: false,
    });
  });

  it('should maintain current state for unknown action', () => {
    expect(reducer(undefined, {
      types: `${types.PROFILE_FETCH_FAILURE}_INVALID`,
    })).toEqual({
      ...INITIAL_STATE,
    });
  });
});
