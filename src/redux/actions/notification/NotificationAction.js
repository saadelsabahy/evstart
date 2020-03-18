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
         console.log(notification);

         const {
            _data: { ParentId, StudentName, TimeStamp, Type },
         } = notification;
         onReceiveNotification(dispatch, {
            ParentId,
            StudentName,
            TimeStamp,
            Type,
         });
      });
   // when app open in background
   onOpenNotificationListener = firebase
      .notifications()
      .onNotificationOpened(async notificationOpen => {
         const {
            notification: {
               _data: { ParentId, StudentName, TimeStamp, Type },
            },
         } = notificationOpen;
         onReceiveNotification(dispatch, {
            ParentId,
            StudentName,
            TimeStamp,
            Type,
         });
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
                  _data: { ParentId, StudentName, TimeStamp, Type },
                  _notificationId,
               },
            } = openWhenAppClosedListener;
            const lastOpenFromClosedId = await AsyncStorage.getItem(
               'lastNotification'
            );
            if (_notificationId !== lastOpenFromClosedId) {
               await AsyncStorage.setItem('lastNotification', _notificationId);
               onReceiveNotification(dispatch, {
                  ParentId,
                  StudentName,
                  TimeStamp,
                  Type,
               });
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
const onReceiveNotification = async (
   dispatch,
   { ParentId, StudentName, TimeStamp, Type }
) => {
   dispatch({ type: GET_NOTIFICATION_LOADER, payload: true });
   await addNotificationToFireStore(ParentId, StudentName, TimeStamp, Type);

   const fireStoreData = await getAllDataFromFireStore(userId);
   dispatch({ type: RECEIVE_NOTIFICATION, payload: fireStoreData });
};
// add to fire store
const addNotificationToFireStore = async (
   ParentId,
   StudentName,
   TimeStamp,
   Type
) => {
   await firebase
      .firestore()
      .collection(`${userId}`)
      .add({
         ParentId,
         StudentName,
         TimeStamp,
         Type,
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
