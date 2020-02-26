import React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
} from 'react-native';

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
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      borderRadius: 7,
   },
   text: {
      color: '#fff',
      textTransform: 'capitalize',
      fontSize: 18,
      letterSpacing: 0.8,
   },
});

export { CustomButton };
