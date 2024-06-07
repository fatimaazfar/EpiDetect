import { combineReducers } from 'redux';
import auth from './authReducer';
import profile from './profileReducer';
import alert from './alertReducer';
import records from './recordReducer';

export default combineReducers({
  auth,
  profile,
  alert,
  records
});
