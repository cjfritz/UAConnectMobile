import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
// import more reducers here to be comibined into the master reducer

export default combineReducers({
  auth: AuthReducer,
  // add more state here
});
