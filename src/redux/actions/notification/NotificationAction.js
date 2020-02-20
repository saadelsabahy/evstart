import firebase from 'react-native-firebase';
import { ASSIGN_FCM_TOKEN, RECEIVE_NOTIFICATION } from './NotificationTypes';

export const getNotification = () => async (dispatch, getState) => {
   firebase.notifications().onNotification(async notification => {
      console.log(notification);
      await dispatch({ type: RECEIVE_NOTIFICATION, payload: {} });
      alert('got a notification');
   });
};
