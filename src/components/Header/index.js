import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ headerText }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.headerText}>{headerText}</Text>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: 50,
      backgroundColor: '#000',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
   },
   headerText: {
      color: '#fff',
      fontSize: 18,
      textTransform: 'capitalize',
   },
});

export { Header };
