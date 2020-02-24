import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '../../components';

const UserProfile = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <View style={styles.backContainer}>
            <IconButton
               iconName={'keyboard-backspace'}
               iconColor="#fff"
               iconSize={25}
               onIconPressed={() => navigation.goBack()}
            />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   backContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(0,0,0,.5)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      start: 10,
      top: 10,
   },
});

export default UserProfile;
