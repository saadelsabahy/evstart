import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
});
export { IconButton };
