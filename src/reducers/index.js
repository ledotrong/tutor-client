import { combineReducers } from 'redux';
import user from './User';
import skills from './Skills';
const rootReducer = combineReducers({
  user,
  skills
});
export default rootReducer;