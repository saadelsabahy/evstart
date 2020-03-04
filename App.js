if (__DEV__) {
   import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
   );
}

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from './src/navigation';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage from 'react-native-flash-message';
import firebase from 'react-native-firebase';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import moment from 'moment';
const App = () => {
   useEffect(() => {
      getFcmToken();
      firebase
         .firestore()
         .collection('11')
         .doc('type')
         .delete()
         .then(function() {
            console.log('Document successfully deleted!');
         })
         .catch(function(error) {
            console.error('Error removing document: ', error);
         });
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
         <PersistGate persistor={persistor}>
            <View style={styles.container}>
               <StatusBar backgroundColor={'#000'} />
               <AppNavigation />
               <FlashMessage position="bottom" style={styles.flashMessage} />
            </View>
         </PersistGate>
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
