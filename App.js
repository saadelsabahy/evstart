import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export class App extends Component {
   async componentDidMount() {
      const enabled = await firebase.messaging().hasPermission();

      if (enabled) {
         const fcmToken = await firebase.messaging().getToken();
         console.log('fcmToken', fcmToken);
         firebase.notifications().onNotification(notification => {
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
   render() {
      return (
         <View style={styles.container}>
            <Text> textInComponent </Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default App;
