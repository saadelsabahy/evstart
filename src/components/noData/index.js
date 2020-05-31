import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { MAIN_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText } from '../customText';

const EmptyList = ({ iconSize, emptyText }) => {
   return (
      <View style={styles.container}>
         <Icon
            name={'exclamation'}
            size={iconSize || responsiveFontSize(4)}
            color={MAIN_COLOR}
         />
         <CustomText
            textStyle={styles.text}
            text={emptyText || 'No data found'}
         />
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
