import firebase, { notifications } from 'react-native-firebase';
import {
   ASSIGN_FCM_TOKEN,
   RECEIVE_NOTIFICATION,
   GET_NOTIFICATION_FAILED,
   GET_NOTIFICATON_SUCCESS,
   GET_NOTIFICATION_LOADER,
} from './NotificationTypes';
import AsyncStorage from '@react-native-community/async-storage';
let onRecieveNotificationListener, onOpenNotificationListener;
export const getNotification = navigation => async (dispatch, getState) => {
   navigation.navigate('Home');
   //when app opend
   onRecieveNotificationListener = firebase
      .notifications()
      .onNotification(async notification => {
         const {
            _data: { userId, type },
         } = notification;
         onReceiveNotification(dispatch, userId, type);
      });
   // when app open in background
   onOpenNotificationListener = firebase
      .notifications()
      .onNotificationOpened(async notificationOpen => {
         const {
            notification: {
               _data: { type, userId },
            },
         } = notificationOpen;
         onReceiveNotification(dispatch, userId, type);
      });
   //open when app is closed
   firebase
      .notifications()
      .getInitialNotification()
      .then(async openWhenAppClosedListener => {
         if (openWhenAppClosedListener) {
            const {
               notification,
               notification: {
                  _data: { type, userId },
                  _notificationId,
               },
            } = openWhenAppClosedListener;
            const lastOpenFromClosedId = await AsyncStorage.getItem(
               'lastNotification'
            );
            if (_notificationId !== lastOpenFromClosedId) {
               await AsyncStorage.setItem('lastNotification', _notificationId);
               onReceiveNotification(dispatch, userId, type);
            } else {
               return;
            }
         }
      });
};
// delete notification listeners when un mount
export const deleteNotificationOnUnmount = () => {
   onRecieveNotificationListener();
   onOpenNotificationListener();
};
// get all notification when app opend
export const getAllNotifications = () => async (dispatch, getState) => {
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
// handle receive notification
const onReceiveNotification = async (dispatch, userId, type) => {
   dispatch({ type: GET_NOTIFICATION_LOADER, payload: true });
   await addNotificationToFireStore(userId, type);

   const fireStoreData = await getAllDataFromFireStore(userId);
   dispatch({ type: RECEIVE_NOTIFICATION, payload: fireStoreData });
};
// add to fire store
const addNotificationToFireStore = async (userId, type) => {
   await firebase
      .firestore()
      .collection(`${userId}`)
      .add({
         type,
      });
};
// get firestore data
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
