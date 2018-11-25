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

export const emailChanged = text => (
  {
    type: EMAIL_CHANGED,
    payload: text,
  }
);

export const passwordChanged = text => (
  {
    type: PASSWORD_CHANGED,
    payload: text,
  }
);

export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
  firebase.auth().signOut()
    .then(() => {
      dispatch({ type: LOGOUT_USER_SUCCESS });
      NavigationService.navigate('Login');
    }).catch(error => {
      console.log(error);
      dispatch({ type: LOGOUT_USER_FAIL });
      NavigationService.back('Home');
    });
};

export const loginUser = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_USER });
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      loginUserSuccess(dispatch, user);
    })
    .catch(error => {
      console.log(error);
      loginUserFailed(dispatch);
    });
};

export const loginUserSuccess = (dispatch, user) => {
  console.log('dispatching login success action');
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });

  NavigationService.navigate('Home');
};

export const loginUserFailed = dispatch => {
  console.log('dispatching login failure action');
  showToast('Invalid Email/Password', 3000, 'top', 'danger');
  dispatch({ type: LOGIN_USER_FAIL });
  NavigationService.navigate('Login');
};
