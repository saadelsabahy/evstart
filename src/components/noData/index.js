import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const EmptyList = () => {
   return (
      <View style={styles.container}>
         <Icon name={'exclamation'} size={30} />
         <Text style={styles.text}>No data found</Text>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      letterSpacing: 1,
   },
});

export { EmptyList };
