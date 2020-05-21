import React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
} from 'react-native';
import { MAIN_COLOR, WHITE_COLOR, SCREEN_HEIGHT } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const CustomButton = ({
   buttonTitle,
   buttonTitleStyle,
   loading,
   spinnerColor,
   spinnerSize,
   onButtonPressed,
   buttonContainerStyle,
   buttonActiveOpacity,
}) => {
   return (
      <TouchableOpacity
         style={[styles.container, buttonContainerStyle]}
         onPress={onButtonPressed}
         activeOpacity={buttonActiveOpacity || 0.8}>
         {loading ? (
            <ActivityIndicator
               size={spinnerSize || 'small'}
               animating
               color={spinnerColor}
            />
         ) : (
            <Text style={[styles.text, buttonTitleStyle]}>{buttonTitle}</Text>
         )}
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '80%',
      height: SCREEN_HEIGHT / 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: MAIN_COLOR,
      borderRadius: 7,
   },
   text: {
      color: WHITE_COLOR,
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(2.5),
      letterSpacing: 0.8,
   },
});

export { CustomButton };
