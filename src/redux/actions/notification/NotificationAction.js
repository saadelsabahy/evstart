import firebase from 'react-native-firebase';
import {
   ASSIGN_FCM_TOKEN,
   RECEIVE_NOTIFICATION,
   GET_NOTIFICATION_FAILED,
   GET_NOTIFICATON_SUCCESS,
   GET_NOTIFICATION_LOADER,
} from './NotificationTypes';
import AsyncStorage from '@react-native-community/async-storage';

export const getNotification = () => async (dispatch, getState) => {
   firebase.notifications().onNotification(async notification => {
      console.log('data', notification._data);
      await dispatch({ type: RECEIVE_NOTIFICATION, payload: {} });
      firebase
         .firestore()
         .collection(`${notification._data.userId}`)
         .add({
            type: notification._data.type,
            date: new Date(),
         });
   });
   firebase.notifications().onNotificationOpened(notificationOpen => {
      const {
         notification: {
            _data: { type, userId },
         },
      } = notificationOpen;
      console.log('notification opend', type, userId);
      firebase
         .firestore()
         .collection(`${userId}`)
         .add({
            type,
            date: new Date(),
         });
   });
};

export const getAllNotifications = () => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_NOTIFICATION_LOADER, payload: true });
      const userId = await AsyncStorage.getItem('userId');
      let getNotificationResponse = await firebase
         .firestore()
         .collection(`${userId}`)
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
