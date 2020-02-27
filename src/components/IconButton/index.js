import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = ({
   onIconPressed,
   iconContainerStyle,
   iconName,
   iconStyle,
   iconColor,
   iconSize,
   touchableStyle,
   activeOpacity,
   buttonTextStyle,
   iconButtonText,
}) => {
   return (
      <TouchableOpacity
         onPress={onIconPressed}
         style={[styles.iconContainer, touchableStyle]}
         activeOpacity={activeOpacity || 0.9}>
         <Icon
            name={iconName}
            color={iconColor}
            size={iconSize || 20}
            style={[iconStyle]}
         />
         {iconButtonText && (
            <Text style={[styles.text, buttonTextStyle]}>{iconButtonText}</Text>
         )}
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      fontSize: 15,
      color: '#fff',
      textTransform: 'capitalize',
      letterSpacing: 1,
   },
});
export { IconButton };
