import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlannerReducer from './PlannerReducer';
import PlannerFormReducer from './PlannerFormReducer';
import ProfileReducer from './ProfileReducer';
// import more reducers here to be comibined into the master reducer
// combine all reducers to make up application state
export default combineReducers({
  auth: AuthReducer,
  planner: PlannerReducer,
  plannerForm: PlannerFormReducer,
  profile: ProfileReducer,
  // add more state here
});
