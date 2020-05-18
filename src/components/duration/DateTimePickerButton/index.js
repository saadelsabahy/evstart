import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { CustomText } from '../../customText';
import { Icon } from '../../Icon';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   TEXT_COLOR,
   SCREEN_WIDTH,
   SCREEN_HEIGHT,
} from '../../../constants/colors';

const DateTimeButton = ({
   onPress,
   text,
   iconEnd,
   iconEndType,
   iconEndColor,
   iconEndSize,
   iconEndStyle,
   iconContainerStyle,
}) => {
   return (
      <TouchableWithoutFeedback onPress={onPress}>
         <View style={styles.container}>
            <View style={[styles.textContainer]}>
               <CustomText text={text} />
            </View>
            <View style={[styles.iconContainer, iconContainerStyle]}>
               <Icon
                  name={iconEnd}
                  type={iconEndType}
                  color={iconEndColor}
                  size={iconEndSize}
                  style={iconEndStyle}
               />
            </View>
         </View>
      </TouchableWithoutFeedback>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '47%',
      height: SCREEN_HEIGHT / 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      borderRadius: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2),
      paddingHorizontal: 10,
      paddingEnd: 0,
      backgroundColor: WHITE_COLOR,
   },
   textContainer: {
      flex: 0.8,
      alignItems: 'center',
   },
   iconContainer: {
      width: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2) / 12,
      height: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2) / 12,
      borderRadius: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: MAIN_COLOR,
   },
});
export default DateTimeButton;
