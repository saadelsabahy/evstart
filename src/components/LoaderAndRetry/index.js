import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import { MAIN_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText } from '../customText';

const LoaderAndRetry = ({ loading, error, onRetryPressed }) => {
   return (
      <View style={styles.container}>
         {loading && (
            <View style={styles.contentContainer}>
               <ActivityIndicator size="large" color={MAIN_COLOR} />
               <CustomText text={'Getting your data....'} />
            </View>
         )}
         {error && (
            <View style={styles.contentContainer}>
               <IconButton
                  iconName="reload"
                  onIconPressed={onRetryPressed}
                  iconSize={responsiveFontSize(4)}
                  iconColor={MAIN_COLOR}
               />
               <CustomText text="Something wrong please try again" />
            </View>
         )}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
   },
   contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export { LoaderAndRetry };
