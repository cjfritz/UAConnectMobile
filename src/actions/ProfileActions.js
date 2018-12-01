import firebase from 'firebase';
import {
  PROFILE_UPDATE,
  PROFILE_FETCH,
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_FAILURE,
} from './types';
import { showToast } from '../components/common/showToast';
// dispatch profile update action to update profile fields
export const profileUpdate = ({ prop, value }) => (
  { type: PROFILE_UPDATE, payload: { prop, value } }
);
// save profile fields to firebase when save button is pressed
export const profileSave = ({
  name,
  address,
  phone,
  standing,
  expectedGraduation,
}) => {
  // get current user logged in this session
  const { currentUser } = firebase.auth();
  // do this to not have to return an action, just call firebase
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/profile/`)
      .set({
        name, address, phone, standing, expectedGraduation,
      }).then(() => {
        showToast('Changes saved', 3000, 'top', 'success');
      })
      .catch(error => {
        showToast('Could not save profile changes', 3000, 'top', 'danger');
        console.log(error);
      });
  };
};
// fetch the profile field info from firebase when the profile screen is rendered
export const profileFetch = () => dispatch => {
  dispatch({ type: PROFILE_FETCH });
  const timeout = setTimeout(() => {
    showToast('Could not get profile info', 3000, 'top', 'danger');
    dispatch({ type: PROFILE_FETCH_FAILURE });
  }, 5000);
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/profile`)
    .once('value', snapshot => {
      clearTimeout(timeout);
      dispatch({ type: PROFILE_FETCH_SUCCESS, payload: snapshot.val() });
    });
};
