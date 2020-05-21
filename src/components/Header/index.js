import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText } from '../customText';
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
                  iconColor={iconStartColor || WHITE_COLOR}
                  onIconPressed={onIconStartPressed}
                  iconSize={iconStartSize || responsiveFontSize(4)}
               />
            )}
            <CustomText textStyle={styles.headerText} text={headerText} />
            {iconEnd && (
               <IconButton
                  iconName={iconEnd}
                  iconColor={iconEndColor || WHITE_COLOR}
                  onIconPressed={onIconEndPressed}
                  iconSize={iconEndSize || responsiveFontSize(4)}
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
      fontSize: responsiveFontSize(3),
   },
});

export { Header };
