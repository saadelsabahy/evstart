import firebase, { notifications } from 'react-native-firebase';
import {
   ASSIGN_FCM_TOKEN,
   RECEIVE_NOTIFICATION,
   GET_NOTIFICATION_FAILED,
   GET_NOTIFICATON_SUCCESS,
   GET_NOTIFICATION_LOADER,
} from './NotificationTypes';
import AsyncStorage from '@react-native-community/async-storage';

export const getNotification = () => async (dispatch, getState) => {
   const userId = await AsyncStorage.getItem('userId');

   firebase.notifications().onNotification(async notification => {
      await addNotificationToFireStore(
         notification._data.userId,
         notification._data.type
      );

      const fireStoreData = await getAllDataFromFireStore(userId);
      console.log('fireStoreData', fireStoreData);

      dispatch({ type: RECEIVE_NOTIFICATION, payload: fireStoreData });
   });
   firebase.notifications().onNotificationOpened(async notificationOpen => {
      dispatch({ type: GET_NOTIFICATION_LOADER, payload: true });

      const {
         notification: {
            _data: { type, userId },
         },
      } = notificationOpen;
      console.log('onNotificationOpened', type, userId);
      await addNotificationToFireStore(userId, type);
      const fireData = await getAllDataFromFireStore(userId);

      dispatch({ type: RECEIVE_NOTIFICATION, payload: fireData });
   });
};

export const getAllNotifications = () => async (dispatch, getState) => {
   console.log('get all');

   try {
      dispatch({ type: GET_NOTIFICATION_LOADER, payload: true });
      const userId = await AsyncStorage.getItem('userId');
      let getNotificationResponse = await getAllDataFromFireStore(userId);
      dispatch({
         type: GET_NOTIFICATON_SUCCESS,
         payload: getNotificationResponse,
      });
   } catch (error) {
      console.log('get notification error', error);
      dispatch({ type: GET_NOTIFICATION_FAILED });
   }
};

const addNotificationToFireStore = async (userId, type) => {
   await firebase
      .firestore()
      .collection(`${userId}`)
      .add({
         type,
      });
};
const getAllDataFromFireStore = async userId => {
   let data = [];
   await firebase
      .firestore()
      .collection(`${userId}`)
      .get()
      .then(querySnapshot => {
         querySnapshot.forEach(doc => {
            data.push(doc._data);
         });
      })
      .catch(e => console.log('get firedata error'));
   return data;
};
