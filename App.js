if (__DEV__) {
   import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
   );
}

import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/navigation';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage from 'react-native-flash-message';
export class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSplash: true,
         showAuth: null,
      };
   }

   async componentDidMount() {
      this.interval = setInterval(this.checkLogin, 950);
      const enabled = await firebase.messaging().hasPermission();

      if (enabled) {
         const fcmToken = await firebase.messaging().getToken();
         console.log('fcmToken', fcmToken);
         firebase.notifications().onNotification(notification => {
            console.log(notification);

            alert('got a notification');
         });
      } else {
         try {
            firebase.messaging().requestPermission();
         } catch (e) {
            alert('user rejected the permissions');
         }
      }
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   checkLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
         this.setState({ showSplash: false });
      } else {
         this.setState({ showSplash: false });
      }
   };

   render() {
      const { showAuth, showSplash } = this.state;
      return (
         <Provider store={store}>
            <View style={styles.container}>
               <StatusBar backgroundColor={'#000'} />
               <AppNavigation showSplash={showSplash} />
               <FlashMessage position="bottom" style={styles.flashMessage} />
            </View>
         </Provider>
      );
   }
}

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
