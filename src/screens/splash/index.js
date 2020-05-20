import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';

const Splash = () => {
   return (
      <View style={styles.container}>
         <Image source={require('../../assets/splash.jpg')} />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: WHITE_COLOR,
   },
});

export default Splash;
