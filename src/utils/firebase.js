import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export const getFcmToken = async () => {
   const enabled = await firebase.messaging().hasPermission();
   if (enabled) {
      const fcmToken = await firebase.messaging().getToken();
      await AsyncStorage.setItem('fcmToken', fcmToken);
      console.log('fcmToken....', fcmToken);
   } else {
      try {
         firebase
            .messaging()
            .requestPermission({
               badge: true,

               sound: true,
            })
            .then(async () => {
               const fcmToken = await firebase.messaging().getToken();
               await AsyncStorage.setItem('fcmToken', fcmToken);
               console.log('fcmToken....', fcmToken);
            })
            .catch(e => {
               console.log('permission error', e);
            });
      } catch (e) {
         console.log('user refuse permission');
      }
   }
};
