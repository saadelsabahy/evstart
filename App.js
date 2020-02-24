if (__DEV__) {
   import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
   );
}

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/navigation';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage from 'react-native-flash-message';
import firebase from 'react-native-firebase';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
const App = () => {
   useEffect(() => {
      getFcmToken();
      // getNotification();
   }, []);
   const getFcmToken = async () => {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
         const fcmToken = await firebase.messaging().getToken();
         await AsyncStorage.setItem('fcmToken', fcmToken);
         console.log(fcmToken);
      } else {
         try {
            firebase.messaging().requestPermission();
         } catch (e) {
            alert('user rejected the permissions');
         }
      }
   };

   return (
      <Provider store={store}>
         <View style={styles.container}>
            <StatusBar backgroundColor={'#001'} />
            <AppNavigation />
            <FlashMessage position="bottom" style={styles.flashMessage} />
         </View>
      </Provider>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   flashMessage: {
      width: '97%',
      alignSelf: 'center',
      borderRadius: 5,
      justifyContent: 'center',
      marginBottom: 5,
   },
});

export default App;
