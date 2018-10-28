import * as types from '../actions/types';
import reducer from './AuthReducer';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: false,
  loading: false,
};

describe('Authentication reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle email changed action', () => {
    expect(reducer(undefined,
      {
        type: types.EMAIL_CHANGED,
        payload: 'Test@test.com',
      })).toEqual(
      {
        ...INITIAL_STATE,
        email: 'Test@test.com',
        error: false,
      }
    );
  });

  it('should handle password changed action', () => {
    expect(reducer(undefined,
      {
        type: types.PASSWORD_CHANGED,
        payload: 'password',
      })).toEqual(
      {
        ...INITIAL_STATE,
        password: 'password',
        error: false,
      }
    );
  });

  it('should handle login user success action', () => {
    expect(reducer(undefined,
      {
        type: types.LOGIN_USER_SUCCESS,
        payload: 'user data',
      })).toEqual(
      {
        ...INITIAL_STATE,
        user: 'user data',
        error: false,
      }
    );
  });

  it('should handle login user failed action', () => {
    expect(reducer(undefined,
      {
        type: types.LOGIN_USER_FAIL,
      })).toEqual(
      {
        ...INITIAL_STATE,
        loading: false,
        error: true,
      }
    );
  });

  it('should handle login user action', () => {
    expect(reducer(undefined,
      {
        type: types.LOGIN_USER,
      })).toEqual(
      {
        ...INITIAL_STATE,
        loading: true,
        error: false,
      }
    );
  });

  it('should handle logout user action', () => {
    expect(reducer(undefined,
      {
        type: types.LOGOUT_USER,
      })).toEqual(
      {
        ...INITIAL_STATE,
        loading: true,
      }
    );
  });

  it('should handle logout user success action', () => {
    expect(reducer(undefined,
      {
        type: types.LOGOUT_USER_SUCCESS,
      })).toEqual(
      {
        ...INITIAL_STATE,
        loading: false,
      }
    );
  });

  it('should handle logout user failure action', () => {
    expect(reducer(undefined,
      {
        type: types.LOGOUT_USER_FAIL,
      })).toEqual(
      {
        ...INITIAL_STATE,
        loading: false,
      }
    );
  });
});
