import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { MAIN_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const EmptyList = ({ iconSize, emptyText }) => {
   return (
      <View style={styles.container}>
         <Icon
            name={'exclamation'}
            size={iconSize || responsiveFontSize(4)}
            color={MAIN_COLOR}
         />
         <Text style={styles.text}>{emptyText || 'No data found'}</Text>
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
      marginVertical: 5,
      fontSize: responsiveFontSize(2.5),
      color: MAIN_COLOR,
   },
});

export { EmptyList };
