import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const StudentInfoCard = ({ containerStyle, childName }) => {
   return (
      <View style={[styles.container, containerStyle]}>
         <Text style={styles.childName}>{childName}</Text>

         <View style={[styles.infoContainer]}>
            <View style={[styles.infoDataContainer]}>
               <Text style={[styles.infoTitle]}>commitment</Text>
               <Text style={[styles.infoVaue]}>9</Text>
            </View>
         </View>

         <View style={[styles.infoContainer]}>
            <View style={[styles.infoDataContainer]}>
               <Text style={[styles.infoTitle]}>percentage</Text>
               <Text style={[styles.infoVaue]}>9</Text>
            </View>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      width: '100%',
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 10,
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
   },
   infoContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   infoDataContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   childName: {
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
