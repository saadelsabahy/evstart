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
         style={[touchableStyle]}
         activeOpacity={activeOpacity || 0.9}>
         <View style={[styles.iconContainer, iconContainerStyle]}>
            <Icon
               name={iconName}
               color={iconColor}
               size={iconSize || 20}
               style={[iconStyle]}
            />
            {iconButtonText && (
               <Text style={[styles.text, buttonTextStyle]}>
                  {iconButtonText}
               </Text>
            )}
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   iconContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
   },
   text: {
      fontSize: 15,
      color: '#fff',
      textTransform: 'capitalize',
      letterSpacing: 1,
   },
});
export { IconButton };
