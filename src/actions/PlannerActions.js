/* eslint-disable no-restricted-globals */
import firebase from 'firebase';
import {
  PLANNER_CREATE,
  PLANNER_UPDATE,
  PLANNER_FETCH_SUCCESS,
  PLANNER_SAVE_SUCCESS,
  PLANNER_FETCH_FAILURE,
  PLANNER_SAVE_FAILURE,
  PLANNER_CLEAR,
  PLANNER_FETCH,
  PLANNER_VALID_UPDATE,
} from './types';
import NavigationService from '../NavigationService';

export const plannerClear = () => (
  { type: PLANNER_CLEAR }
);

export const plannerValidUpdate = ({ prop, value }) => {
  const num = parseFloat(value).toFixed(2);
  switch (prop) {
    case 'grade':
      if ((isNaN(value) && value !== '') || value === null || num < 0 || num > 4) {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: 'validGrade', value: false } };
      } else {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: 'validGrade', value: true } };
      }
    case 'units':
      if ((isNaN(value) && value !== '') || value === null || num < 0 || num > 10) {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: 'validUnits', value: false } };
      } else {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: 'validUnits', value: true } };
      }
    default:
      if (value === null || value === '') {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: `valid${prop.charAt(0).toUpperCase() + prop.slice(1)}`, value: false } };
      } else {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: `valid${prop.charAt(0).toUpperCase() + prop.slice(1)}`, value: true } };
      }
  }
};

export const plannerUpdate = ({ prop, value }) => (
  { type: PLANNER_UPDATE, payload: { prop, value } }
);

export const plannerFetch = () => dispatch => {
  dispatch({ type: PLANNER_FETCH });
  const timeout = setTimeout(() => dispatch({ type: PLANNER_FETCH_FAILURE }), 5000);
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/planner`)
    .on('value', snapshot => {
      clearTimeout(timeout);
      dispatch({ type: PLANNER_FETCH_SUCCESS, payload: snapshot.val() });
    });
};

export const plannerCreate = ({
  course,
  description,
  term,
  grade,
  units,
}) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/planner`)
      .push({
        course,
        description,
        term,
        grade,
        units,
      })
      .then(() => {
        dispatch({ type: PLANNER_CREATE });
        NavigationService.back();
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const plannerSave = ({
  uid,
  course,
  description,
  term,
  grade,
  units,
}) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/planner/${uid}`)
      .set({
        course, description, term, grade, units,
      }).then(() => {
        dispatch({ type: PLANNER_SAVE_SUCCESS });
        NavigationService.back();
      })
      .catch(error => {
        dispatch({ type: PLANNER_SAVE_FAILURE });
        console.log(error);
      });
  };
};

export const plannerDelete = uid => {
  const { currentUser } = firebase.auth();
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/planner/${uid}`)
      .remove()
      .then(() => {
        NavigationService.back();
      })
      .catch(error => {
        console.log(error);
      });
  };
};
