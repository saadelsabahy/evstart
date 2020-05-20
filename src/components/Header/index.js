import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';
const Header = ({
   headerText,
   onIconStartPressed,
   onIconEndPressed,
   iconStart,
   iconStartColor,
   iconEnd,
   iconEndColor,
   iconEndSize,
   iconStartSize,
   iconEndText,
}) => {
   return (
      <View style={styles.container}>
         <View style={styles.contentContainer}>
            {iconStart && (
               <IconButton
                  iconName={iconStart}
                  iconColor={iconStartColor || '#fff'}
                  onIconPressed={onIconStartPressed}
                  iconSize={iconStartSize}
               />
            )}
            <Text style={styles.headerText}>{headerText}</Text>
            {iconEnd && (
               <IconButton
                  iconName={iconEnd}
                  iconColor={iconEndColor || '#fff'}
                  onIconPressed={onIconEndPressed}
                  iconSize={iconEndSize}
               />
            )}
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '10%',
      backgroundColor: MAIN_COLOR,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   contentContainer: {
      width: '95%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   headerText: {
      color: WHITE_COLOR,
      fontSize: 20,
      textTransform: 'capitalize',
      letterSpacing: 1,
   },
});

export { Header };
