import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';

const LoaderAndRetry = ({ loading, error, onRetryPressed }) => {
   return (
      <View style={styles.container}>
         {loading && (
            <View style={styles.contentContainer}>
               <ActivityIndicator size="large" color="#000" />
               <Text>Getting your data....</Text>
            </View>
         )}
         {error && (
            <View style={styles.contentContainer}>
               <IconButton
                  iconName="reload"
                  onIconPressed={onRetryPressed}
                  iconSize={50}
               />
               <Text>Something wrong please try again</Text>
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
