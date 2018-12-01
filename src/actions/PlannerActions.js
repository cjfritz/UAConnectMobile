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
// dispatch action to clear the planner form upon leaving
export const plannerClear = () => (
  { type: PLANNER_CLEAR }
);
// dispatch action that verifies input from planner form
export const plannerValidUpdate = ({ prop, value }) => {
  const num = parseFloat(value).toFixed(2);
  let termType;
  let termYear;
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
    case 'term':
      [termType, termYear] = value.split(' - ');
      if (!termType || termType === '' || termYear === '' || !termYear) {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: `valid${prop.charAt(0).toUpperCase() + prop.slice(1)}`, value: false } };
      } else {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: `valid${prop.charAt(0).toUpperCase() + prop.slice(1)}`, value: true } };
      }
    default:
      if (value === null || value === '') {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: `valid${prop.charAt(0).toUpperCase() + prop.slice(1)}`, value: false } };
      } else {
        return { type: PLANNER_VALID_UPDATE, payload: { prop: `valid${prop.charAt(0).toUpperCase() + prop.slice(1)}`, value: true } };
      }
  }
};
// dispatch action to update a general prop with action
export const plannerUpdate = ({ prop, value }) => (
  { type: PLANNER_UPDATE, payload: { prop, value } }
);
// dispatch action to fetch course planner info from firebase
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
// dispatch action to create new course entry in firebase, and update app state
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
// dispatch action to save changes to a course in firebase and app state
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
// dispatch action to delete course from firebase and app state
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
