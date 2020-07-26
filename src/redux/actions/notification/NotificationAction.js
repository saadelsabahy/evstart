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
         console.log('open', notification);
      });
   // when app open in background
   onOpenNotificationListener = firebase
      .notifications()
      .onNotificationOpened(async notificationOpen => {
         console.log('background', notificationOpen);
      });
   //open when app is closed
   firebase
      .notifications()
      .getInitialNotification()
      .then(async openWhenAppClosedListener => {
         console.log('closed');
      })
      .catch(e => console.log('recieve close app notification error', e));
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
      firebase
         .firestore()
         .collection('notificationBadge')
         .doc(userId)
         .update({ badgeCount: 0 });
   } catch (error) {
      console.log('get notification error', error);
      dispatch({ type: GET_NOTIFICATION_FAILED });
   }
};

// get firestore data
const getAllDataFromFireStore = async ParentId => {
   let data = [];
   await firebase
      .firestore()
      .collection(`UserNotification`)
      .doc(`${ParentId}`)
      .get()
      .then(querySnapshot => {
         querySnapshot.forEach(doc => {
            data.push(doc._data);
         });
      })
      .catch(e => console.log('get firedata error', e));
   return data;
};

// handle receive notification
const onReceiveNotification = async (
   dispatch,
   { ParentId, StudentName, TimeStamp, Type, notificationId, transactionId }
) => {
   dispatch({ type: GET_NOTIFICATION_LOADER, payload: true });
   await addNotificationToFireStore(
      ParentId,
      StudentName,
      TimeStamp,
      Type,
      notificationId,
      transactionId
   );

   const fireStoreData = await getAllDataFromFireStore(ParentId);
   dispatch({ type: RECEIVE_NOTIFICATION, payload: fireStoreData });
};
// add to fire store
const addNotificationToFireStore = async (
   ParentId,
   StudentName,
   TimeStamp,
   Type,
   notificationId,
   transactionId
) => {
   try {
      await firebase
         .firestore()
         .collection(`${ParentId}`)
         .add({
            ParentId,
            StudentName,
            TimeStamp,
            Type,
            notificationId,
            transactionId,
         });
   } catch (error) {
      console.log('add to fire store error', error);
   }
};
