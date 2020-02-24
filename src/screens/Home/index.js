import React, { useEffect, useState } from 'react';
import {
   Text,
   View,
   FlatList,
   ActivityIndicator,
   StyleSheet,
} from 'react-native';
import { CustomButton, ProfileModal } from '../../components';
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

   const notifications = useSelector(state => state.Notification.notifications);
   const [modalVisible, setModalVisible] = useState(false);
   useEffect(() => {
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

   return (
      <View style={styles.container}>
         <Header
            headerText={'home'}
            onIconStartPressed={() => setModalVisible(true)}
            iconStart={'account'}
            iconEnd={'logout'}
            onIconEndPressed={() => dispatch(onLogoutPressed(navigation))}
            iconEndSize={25}
            iconStartSize={25}
         />
         {getNotificationLoader ? (
            <View style={styles.loaderContainer}>
               <ActivityIndicator color="#000" animating size="large" />
            </View>
         ) : (
            <NotificationList data={notifications} />
         )}
         <ProfileModal
            modalVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            name={name}
            phone={phone}
            email={email}
         />
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
