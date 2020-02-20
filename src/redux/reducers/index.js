import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Notification from './notificationReducer';

export default combineReducers({
   Auth,
   Notification,
});
