import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BLACK_COLOR, WHITE_COLOR } from '../../constants/colors';

const Splash = () => {
   return (
      <View style={styles.container}>
         <Text style={styles.splashText}>splash...</Text>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BLACK_COLOR,
   },
   splashText: {
      color: WHITE_COLOR,
      fontSize: 18,
   },
});

export default Splash;
