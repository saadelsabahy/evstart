import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
      backgroundColor: '#000',
   },
   splashText: {
      color: '#fff',
      fontSize: 18,
   },
});

export default Splash;
