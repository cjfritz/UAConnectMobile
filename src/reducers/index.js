import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlannerReducer from './PlannerReducer';
import PlannerFormReducer from './PlannerFormReducer';
// import more reducers here to be comibined into the master reducer

export default combineReducers({
  auth: AuthReducer,
  planner: PlannerReducer,
  plannerForm: PlannerFormReducer,
  // add more state here
});
