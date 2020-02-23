import React, { useEffect, useState } from 'react';
import {
   Text,
   View,
   FlatList,
   ActivityIndicator,
   StyleSheet,
} from 'react-native';
import { CustomButton } from '../../components';
import { connect } from 'react-redux';
import {
   getNotification,
   onLogoutPressed,
   getAllNotifications,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import NotificationList from '../../components/notificationList';

const Home = ({ navigation, route }) => {
   const dispatch = useDispatch();
   const getNotificationLoader = useSelector(
      state => state.Notification.getNotificationLoader
   );

   const notifications = useSelector(state => state.Notification.notifications);
   useEffect(() => {
      dispatch(getAllNotifications());
      dispatch(getNotification());
   }, []);
   console.log('get loader', getNotificationLoader);

   return (
      <View style={styles.container}>
         <Header headerText={'home'} />
         {/*  <CustomButton
            buttonTitle={'logout'}
            onButtonPressed={() => dispatch(onLogoutPressed(navigation))}
         /> */}
         {getNotificationLoader ? (
            <View style={styles.loaderContainer}>
               <ActivityIndicator color="#000" animating size="large" />
            </View>
         ) : (
            <NotificationList data={notifications} />
         )}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   loaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default Home;
