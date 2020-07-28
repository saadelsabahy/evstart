import React, { useEffect, useState } from 'react';
import {
   Text,
   View,
   FlatList,
   ActivityIndicator,
   StyleSheet,
} from 'react-native';
import { CustomButton, ProfileModal, LoaderAndRetry } from '../../components';
import { connect } from 'react-redux';
import {
   getNotification,
   onLogoutPressed,
   getAllNotifications,
   deleteNotificationOnUnmount,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import NotificationList from '../../components/notificationList';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { PushNotificationConfigration } from '../../utils/PushNotificationConfig';
const Home = ({ navigation, route }) => {
   const dispatch = useDispatch();
   const isFocused = useIsFocused();
   const getNotificationLoader = useSelector(
      state => state.Notification.getNotificationLoader
   );
   const getNotificationError = useSelector(
      state => state.Notification.getNotificationError
   );
   const notifications = useSelector(state => state.Notification.notifications);
   const [modalVisible, setModalVisible] = useState(false);
   useEffect(() => {
      if (isFocused) {
         dispatch(getAllNotifications());
         PushNotificationConfigration(dispatch);
         // dispatch(getNotification(navigation));
      } else {
         return;
      }
      return () => {
         /* deleteNotificationOnUnmount(); */
      };
   }, [isFocused]);

   const [refreshing, setRefreshing] = useState(false);

   const handleRefresh = async () => {
      setRefreshing(true);
      dispatch(getAllNotifications());
      setRefreshing(false);
   };
   return (
      <View style={styles.container}>
         <Header
            headerText={'home'}
            onIconStartPressed={() => navigation.navigate('Profile')}
            iconStart={'account'}
            iconEnd={'logout'}
            onIconEndPressed={() => dispatch(onLogoutPressed(navigation))}
            iconEndSize={responsiveFontSize(4)}
            iconStartSize={responsiveFontSize(4)}
            iconEndText={'logout'}
         />
         {getNotificationLoader || getNotificationError ? (
            <View style={styles.loaderContainer}>
               <LoaderAndRetry
                  error={getNotificationError}
                  loading={getNotificationLoader}
                  onRetryPressed={() => dispatch(getAllNotifications())}
               />
            </View>
         ) : (
            <NotificationList
               data={notifications}
               refreshing={refreshing}
               handleRefresh={handleRefresh}
            />
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
