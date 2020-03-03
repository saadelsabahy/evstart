import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const StudentInfoCard = ({
   containerStyle,
   childName,
   commitmentPercentage,
}) => {
   return (
      <View style={[styles.container, containerStyle]}>
         <Text style={styles.childName}>{childName}</Text>

         <View style={[styles.infoContainer]}>
            <View style={[styles.infoDataContainer]}>
               <Text style={[styles.infoTitle]}>commitment</Text>
               <Text style={[styles.infoVaue]}>{commitmentPercentage}</Text>
            </View>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      width: '98%',
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 5,
      ...Platform.select({
         android: {
            elevation: 2,
         },
         ios: {
            shadowColor: '#000',
            shadowOffset: { height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
         },
      }),
      paddingHorizontal: 5,
      marginVertical: 10,
      alignSelf: 'center',
   },
   infoContainer: {
      width: '40%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   infoDataContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   childName: {
      flex: 1,
      textTransform: 'capitalize',
      fontSize: 15,
      fontWeight: '400',
      letterSpacing: 1,
   },
   infoTitle: {
      textTransform: 'capitalize',
      fontSize: 15,
      fontWeight: '400',
      letterSpacing: 1,
      color: '#999',
   },
   infoVaue: {
      fontSize: 18,
   },
});

export { StudentInfoCard };
