import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { TEXT_COLOR } from '../../constants/colors';

const CustomText = ({ text, textStyle, props }) => {
   return (
      <Text style={[styles.text, textStyle]} {...props}>
         {text}
      </Text>
   );
};
const styles = StyleSheet.create({
   text: {
      // fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(2),
      color: TEXT_COLOR,
   },
});

export { CustomText };
