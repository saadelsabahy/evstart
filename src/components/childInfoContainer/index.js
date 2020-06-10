import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   Platform,
   TouchableOpacity,
   Dimensions,
} from 'react-native';
import { BLACK_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';
const { width, height } = Dimensions.get('window');
const StudentInfoCard = ({
   containerStyle,
   childName,
   commitmentPercentage,
   onPress,
}) => {
   return (
      <TouchableOpacity
         style={[styles.container, containerStyle]}
         onPress={onPress}
         activeOpacity={0.85}>
         <View
            style={{
               width: '90%',
               height: '100%',
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'space-between',
               alignSelf: 'center',
            }}>
            <View
               style={{
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  width: '60%',
                  alignItems: 'center',
               }}>
               <CustomText text={`${childName}`} />
            </View>

            <View style={[styles.infoContainer]}>
               <View style={[styles.infoDataContainer]}>
                  <CustomText text={'commitment'} />
                  <CustomText text={commitmentPercentage} />
               </View>
            </View>
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      width: '98%',
      height: height / 10,
      borderRadius: 5,
      ...Platform.select({
         android: {
            elevation: 2,
         },
         ios: {
            shadowColor: BLACK_COLOR,
            shadowOffset: { height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
         },
      }),
      marginVertical: 10,
      alignSelf: 'center',
   },
   infoContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%',
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
