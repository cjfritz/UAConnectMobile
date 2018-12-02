import firebase from 'firebase';
import NavigationService from '../NavigationService';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
} from './types';
import { showToast } from '../components/common/showToast';
// dispatch action when text in email field changes
export const emailChanged = text => (
  {
    type: EMAIL_CHANGED,
    payload: text,
  }
);
// dispatch action when text in password field changes
export const passwordChanged = text => (
  {
    type: PASSWORD_CHANGED,
    payload: text,
  }
);
// dispatch action when user wishes to logout
export const logoutUser = () => dispatch => {
  // dispatch acion to let system know user is logging out
  dispatch({ type: LOGOUT_USER });
  // call firebase to logout the user
  firebase.auth().signOut()
    .then(() => {
      // dispatch action to log the user out
      dispatch({ type: LOGOUT_USER_SUCCESS });
      NavigationService.navigate('Login');
    }).catch(error => {
      // report error if necessary
      console.log(error);
      dispatch({ type: LOGOUT_USER_FAIL });
      NavigationService.back('Home');
    });
};
// action creator to log the user in with provided email and password
export const loginUser = ({ email, password }) => dispatch => {
  // dispatch login action to start activity spinner
  dispatch({ type: LOGIN_USER });
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      // call success login helper function
      loginUserSuccess(dispatch, user);
    })
    .catch(error => {
      // report error and call failed login helper
      console.log(error);
      loginUserFailed(dispatch);
    });
};
// dispatches a login success action on login success
export const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  // navigate to homescreen
  NavigationService.navigate('Home');
};
// dispatches login failure
export const loginUserFailed = dispatch => {
  showToast('Invalid credentials or lost connection', 3000, 'top', 'danger');
  dispatch({ type: LOGIN_USER_FAIL });
  // stay in the login screen
  NavigationService.navigate('Login');
};
