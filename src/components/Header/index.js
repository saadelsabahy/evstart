import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
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
      height: 50,
      backgroundColor: '#000',
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
      color: '#fff',
      fontSize: 18,
      textTransform: 'capitalize',
   },
});

export { Header };
