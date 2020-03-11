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
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import NotificationList from '../../components/notificationList';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({ navigation, route }) => {
   const dispatch = useDispatch();

   const getNotificationLoader = useSelector(
      state => state.Notification.getNotificationLoader
   );
   const getNotificationError = useSelector(
      state => state.Notification.getNotificationError
   );
   const notifications = useSelector(state => state.Notification.notifications);
   const [modalVisible, setModalVisible] = useState(false);
   useEffect(() => {
      console.log('called');

      dispatch(getAllNotifications());
      dispatch(getNotification());
   }, []);
   const [name, setName] = useState(
      AsyncStorage.getItem('name', (err, res) => setName(res))
   );
   const [phone, setPhone] = useState(
      AsyncStorage.getItem('phone', (err, res) => setPhone(res))
   );
   const [email, setEmail] = useState(
      AsyncStorage.getItem('email', (err, res) => setEmail(res))
   );
   const [refreshing, setRefreshing] = useState(false);
   console.log(notifications);
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
            iconEndSize={25}
            iconStartSize={25}
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
