import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import Profile from '../../assets/profile.png';
const ProfileModal = ({
   modalVisible,
   onBackdropPress,
   profilePicture,
   name,
   email,
   phone,
}) => {
   return (
      <View style={styles.container}>
         <Modal
            isVisible={modalVisible}
            backdropOpacity={0.5}
            onBackdropPress={onBackdropPress}
            style={styles.modal}
            animationIn="fadeInDown"
            animationOut="fadeOutDown">
            <View style={styles.profileCardContainer}>
               <View style={styles.profileImageContainer}>
                  <Image
                     source={profilePicture ? { uri: profilePicture } : Profile}
                     style={styles.profileImage}
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
         </Modal>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
   },
   profileCardContainer: {
      backgroundColor: '#fff',
      width: '75%',
      height: 150,
      borderRadius: 10,
      justifyContent: 'space-around',
      alignItems: 'center',
      /* borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10, */
   },
   profileImageContainer: {
      position: 'absolute',
      alignSelf: 'center',
      top: -40,
      width: 80,
      height: 80,
      borderRadius: 40,
   },
   profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
   },
   userInfoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   nameTextStyle: {
      marginVertical: 7,
      fontSize: 18,
      fontWeight: '400',
   },
   emailAndPhoneTextStyle: {
      marginBottom: 5,
      fontSize: 15,
   },
});

export { ProfileModal };
