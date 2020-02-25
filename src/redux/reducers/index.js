import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Notification from './notificationReducer';
import UserProfile from './UserProfile';

export default combineReducers({
   Auth,
   Notification,
   UserProfile,
});
