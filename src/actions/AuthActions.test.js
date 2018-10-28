import firebase from 'firebase';
// import firebasemock from 'firebase-mock';
import * as actions from './AuthActions';
import * as types from './types';

// const mockauth = new firebasemock.MockAuthentication();
// const mockdatabase = new firebasemock.MockFirebase();
// const mockfirestore = new firebasemock.MockFirestore();
// const mockstorage = new firebasemock.MockStorage();
// const mockmessaging = new firebasemock.MockMessaging();
// const mocksdk = new firebasemock.MockFirebaseSdk(
//   // use null if your code does not use RTDB
//   path => {
//     return path ? mockdatabase.child(path) : mockdatabase;
//   },
//   // use null if your code does not use AUTHENTICATION
//   () => {
//     return mockauth;
//   },
//   // use null if your code does not use FIRESTORE
//   () => {
//     return mockfirestore;
//   },
//   // use null if your code does not use STORAGE
//   () => {
//     return mockstorage;
//   },
//   // use null if your code does not use MESSAGING
//   () => {
//     return mockmessaging;
//   }
// );

// jest.mock('firebase', () => ({
//   signOut(resolve) {
//     return resolve ? Promise.resolve() : Promise.reject();
//   },
// }));
// jest.mock('firebase', () => ({
//   app: {
//     App: {
//       auth: () => ({
//         app: {},
//         signOut: () => Promise.resolve(),
//       }),
//     },
//   },
//   initializeApp: jest.fn(),
//   auth: () => ({
//     app: {},
//     signOut: () => Promise.resolve(),
//   }),
// }));


// jest.mock('firebase', () => {
//   signOut() {}
// });

const signOut = jest.fn(() => {
  return Promise.resolve();
});

const initializeApp = jest
  .spyOn(firebase, 'initializeApp')
  .mockImplementation(() => {
    return {
      auth: () => {
        return {
          signOut,
        };
      },
    };
  });

jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    signOut,
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true,
    },
  };
});

describe('Authentication actions', () => {
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

  it('should create an action to logout user', () => {
    const mockDispatch = jest.fn();
    const result = actions.logoutUser();
    // firebase.auth().signOut().then(() => {

    // });
    // firebase.auth = jest.fn().mockReturnValue({
    //   currentUser: true,
    //   signOut: () => jest.fn(),
    // });
    // firebase.auth().signOut().mockImplementationOnce(() => Promise.resolve());
    // mocksdk.auth().signOut();
    // mocksdk.auth().flush();
    result(mockDispatch);
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: types.LOGOUT_USER });
    firebase.auth().signOut().then(() => {
      expect(mockDispatch.mock.calls[0][1]).toEqual({ type: types.LOGOUT_USER_SUCCESS });
    });
    // result(mockDispatch).then(() => {
    //   expect(mockDispatch.mock.calls[0][0]).toEqual({ type: types.LOGOUT_USER_SUCCESS });
    // });

    // firebase.auth().signOut().mockImplementationOnce(() => Promise.reject());
    // result(mockDispatch).then(() => {
    //   expect(mockDispatch.mock.calls[0][1]).toEqual({ type: types.LOGOUT_USER_FAIL });
    // });
  });
});
