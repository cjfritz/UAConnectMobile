import firebase from 'firebase';
import * as actions from './AuthActions';
import * as types from './types';

const signOut = jest.fn(resolve => {
  if (resolve) {
    return Promise.resolve();
  }

  return Promise.reject();
});

// Firebase mocking logic adapted from https://github.com/mrbenhowl/mocking-firebase-initializeApp-and-firebase-auth-using-jest

const signInWithEmailAndPassword = jest.fn((email, password, resolve) => {
  const userData = { email, password };
  const error = 'error';
  if (resolve) {
    return Promise.resolve(userData);
  }
  return Promise.reject(error);
});

jest.spyOn(firebase, 'initializeApp')
  .mockImplementation(() => {
    return {
      auth: () => {
        return {
          signOut,
          signInWithEmailAndPassword,
        };
      },
    };
  });

jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    signOut,
    signInWithEmailAndPassword,
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true,
    },
  };
});

describe('email or password actions', () => {
  it('should create an action to change email text', () => {
    const text = 'Test@test.com';
    const expectedAction = {
      type: types.EMAIL_CHANGED,
      payload: text,
    };

    expect(actions.emailChanged(text)).toEqual(expectedAction);
  });

  it('should create an action to change password text', () => {
    const text = 'password';
    const expectedAction = {
      type: types.PASSWORD_CHANGED,
      payload: text,
    };

    expect(actions.passwordChanged(text)).toEqual(expectedAction);
  });
});

describe('logoutUser action creator', () => {
  it('should dispatch correct action for success case', async () => {
    expect.assertions(2);
    const resolvePromise = true;
    const mockDispatch = jest.fn();
    const result = actions.logoutUser();

    result(mockDispatch);
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: types.LOGOUT_USER });
    firebase.auth().signOut(resolvePromise).then(() => {
      expect(mockDispatch.mock.calls[0][1]).toEqual({ type: types.LOGOUT_USER_SUCCESS });
    });
  });

  it('should dispatch correct action for failure case', async () => {
    expect.assertions(2);
    const resolvePromise = false;
    const mockDispatch = jest.fn();
    const result = actions.logoutUser();

    result(mockDispatch);
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: types.LOGOUT_USER });
    firebase.auth().signOut(resolvePromise).catch(() => {
      expect(mockDispatch.mock.calls[0][1]).toEqual({ type: types.LOGOUT_USER_FAIL });
    });
  });
});

describe('loginUser action creator', async () => {
  it('should dispatch correct acton for success case', async () => {
    expect.assertions(4);
    const resolvePromise = true;
    const { email, password } = { email: 'test@test.com', password: 'password' };
    const mockDispatch = jest.fn();
    const result = actions.loginUser({ email, password });
    const mockLoginUserSuccess = jest.fn((dispatch, userData) => {
      dispatch({ type: types.LOGIN_USER_SUCCESS, payload: userData });
    });

    result(mockDispatch);
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: types.LOGIN_USER });
    await firebase.auth().signInWithEmailAndPassword(email, password, resolvePromise).then(userData => {
      expect(userData).toEqual({ email, password });
      mockLoginUserSuccess(mockDispatch, userData);
    });
    expect(mockLoginUserSuccess).toHaveBeenCalled();
    expect(mockDispatch.mock.calls[1][0]).toEqual({
      type: types.LOGIN_USER_SUCCESS,
      payload: { email, password },
    });
  });

  it('should dispatch correct action for failure case', async () => {
    expect.assertions(4);
    const resolvePromise = false;
    const { email, password } = { email: 'test@test.com', password: 'password' };
    const mockDispatch = jest.fn();
    const result = actions.loginUser({ email, password });
    const mockLoginUserFailed = jest.fn(dispatch => {
      dispatch({ type: types.LOGIN_USER_FAIL });
    });

    result(mockDispatch);
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: types.LOGIN_USER });
    await firebase.auth().signInWithEmailAndPassword(email, password, resolvePromise).catch(error => {
      expect(error).toEqual('error');
      mockLoginUserFailed(mockDispatch);
    });
    expect(mockLoginUserFailed).toHaveBeenCalled();
    expect(mockDispatch.mock.calls[1][0]).toEqual({ type: types.LOGIN_USER_FAIL });
  });
});
