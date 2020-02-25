import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { IconButton, StudentInfoCard } from '../../components';
import Profile from '../../assets/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePicture } from '../../redux/actions';

const UserProfile = ({ navigation, name, email, phone }) => {
   const dispatch = useDispatch();
   const profileImage = useSelector(state => state.UserProfile.image);
   console.log('profileImage......', profileImage.uri);

   return (
      <View style={styles.container}>
         <View style={styles.headerImageContainer}>
            <Image
               source={{
                  uri:
                     'https://cdn.pixabay.com/photo/2016/08/05/09/31/banner-1571858__340.jpg',
               }}
               style={styles.headerImage}
            />
            <IconButton
               iconName={'keyboard-backspace'}
               iconColor="#fff"
               iconSize={25}
               onIconPressed={() => navigation.goBack()}
               touchableStyle={styles.backContainer}
            />
         </View>

         <View style={styles.profileCardContainer}>
            <View style={styles.profileImageContainer}>
               <Image
                  source={
                     profileImage.length !== 0
                        ? { uri: profileImage.uri }
                        : Profile
                  }
                  style={styles.profileImage}
               />
               <IconButton
                  touchableStyle={styles.picImageIcon}
                  iconName={'account-edit'}
                  iconColor="#fff"
                  iconSize={30}
                  onIconPressed={() => dispatch(changeProfilePicture())}
               />
            </View>

            <View style={styles.userInfoContainer}>
               <Text style={styles.nameTextStyle}>{name || 'example'}</Text>
               <Text style={[styles.emailAndPhoneTextStyle]}>
                  {email || 'example@mail.com'}
               </Text>
               <Text style={[styles.emailAndPhoneTextStyle]}>
                  {phone || '010055555555'}
               </Text>
            </View>
         </View>
         <View style={styles.studentsListContainer}>
            <View style={styles.studentsListContentContainer}>
               <Text style={styles.studentListTitle}>students</Text>
               <StudentInfoCard childName={'child name'} />
            </View>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#eee',
   },
   backContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(0,0,0,.2)',
      position: 'absolute',
      start: 10,
      top: 10,
   },
   headerImageContainer: {
      width: '100%',
      height: '25%',
      backgroundColor: '#eee',
   },
   headerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
   },
   profileCardContainer: {
      borderStartColor: '#ddd',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: '#999',
   },
   profileImageContainer: {
      alignSelf: 'center',
      top: -30,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#000',
   },
   profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
   },
   picImageIcon: {
      position: 'absolute',
      bottom: -10,
      end: -10,
      alignSelf: 'flex-end',
      width: 45,
      height: 45,
      borderRadius: 22.5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,.2)',
   },
   userInfoContainer: {
      top: -20,
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   nameTextStyle: {
      marginVertical: 3,
      fontSize: 18,
      fontWeight: '400',
   },
   emailAndPhoneTextStyle: {
      marginBottom: 5,
      fontSize: 15,
   },
   studentsListContainer: {
      flex: 1,
   },
   studentsListContentContainer: {
      width: '95%',
      alignSelf: 'center',
      marginVertical: 5,
   },
   studentListTitle: {
      textTransform: 'capitalize',
      fontSize: 15,
      color: '#999',
      letterSpacing: 0.8,
   },
});

export default UserProfile;
