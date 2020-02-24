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
}) => {
   return (
      <TouchableOpacity onPress={onIconPressed}>
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
