import firebase from 'react-native-firebase';
import {
   ASSIGN_FCM_TOKEN,
   RECEIVE_NOTIFICATION,
   GET_NOTIFICATION_FAILED,
   GET_NOTIFICATON_SUCCESS,
   GET_NOTIFICATION_LOADER,
} from './NotificationTypes';

export const getNotification = () => async (dispatch, getState) => {
   firebase.notifications().onNotification(async notification => {
      console.log(notification);
      await dispatch({ type: RECEIVE_NOTIFICATION, payload: {} });
      alert('got a notification');
      /* firebase
         .firestore()
         .collection('users')
         .add({
            fullname: 'saad',
            date: new Date(),
         }); */
   });
};

export const getAllNotifications = () => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_NOTIFICATION_LOADER, payload: true });
      let getNotificationResponse = await firebase
         .firestore()
         .collection('users')
         .get()
         .then(querySnapshot => {
            let data = [];
            querySnapshot.forEach(doc => {
               data.push(doc._data);
            });
            dispatch({ type: GET_NOTIFICATON_SUCCESS, payload: data });
         });
      console.log('getNotificationResponse', getNotificationResponse);
   } catch (error) {
      console.log('get notification error', error);
      dispatch({ type: GET_NOTIFICATION_FAILED });
   }
};
