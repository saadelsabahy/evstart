if (__DEV__) {
   import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
   );
}

import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/navigation';

export class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSplash: true,
         showAth: null,
      };
   }
   async componentDidMount() {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
         this.setState({ showAth: true, showSplash: false });
      } else {
         this.setState({ showSplash: false });
      }
      /* const enabled = await firebase.messaging().hasPermission();

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
      } */
   }
   render() {
      const { showAth, showSplash } = this.state;
      return (
         <Provider store={store}>
            <View style={styles.container}>
               <StatusBar backgroundColor={'#000'} />
               <AppNavigation showAuth={showAth} showSplash={showSplash} />
            </View>
         </Provider>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default App;
