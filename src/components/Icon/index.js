import React from 'react';

import getIconType from '../../utils/getIconType';
import { View, StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Icon = props => {
   const {
      type,
      name,
      size,
      color,
      style,
      reverse,
      reverseColor,
      iconContainerStyle,
      iconBackGround,
      onPress,
   } = props;

   const IconComponent = getIconType(type);

   return (
      <View style={[styles.container, iconContainerStyle]}>
         <IconComponent
            testID="iconIcon"
            style={[style]}
            size={size || responsiveFontSize(3.5)}
            name={name}
            color={reverse ? reverseColor : color}
            onPress={onPress}
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
});

export { Icon };
