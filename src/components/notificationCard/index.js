import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   Platform,
   TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WHITE_COLOR } from '../../constants/colors';

const NotificationCard = ({
   notificationTimeText,
   notificationIconSize,
   containerStyle,
   headerContainerStyle,
   textAndIconContainer,
   notificationIconStyle,
   notificationIconName,
   notificationNameStyle,
   notificationName,
   onNotificationCardPressed,
   detailesTextStyle,
   detailesContainerStyle,
   timeContainerStyle,
   timeTextStyle,
   notificationDetailes,
   notificationDateText,
}) => {
   return (
      <TouchableOpacity
         style={[styles.container, containerStyle]}
         activeOpacity={0.9}
         onPress={onNotificationCardPressed}>
         <View style={[styles.headContainer, headerContainerStyle]}>
            <View style={[styles.textAndIconContainer, textAndIconContainer]}>
               <Icon
                  name={notificationIconName || 'bell-outline'}
                  style={[styles.headIcon, notificationIconStyle]}
                  size={notificationIconSize || 16}
               />
               <Text style={[styles.headText, notificationNameStyle]}>
                  {notificationName}
               </Text>
            </View>
            <View style={[styles.timeContainer, timeContainerStyle]}>
               <Text style={[styles.timeText, timeTextStyle]}>
                  {notificationTimeText}
               </Text>
               <Text style={[styles.timeText, timeTextStyle]}>
                  {notificationDateText}
               </Text>
            </View>
         </View>
         <View style={[styles.detailsContainer, detailesContainerStyle]}>
            <Text style={[styles.detailesText, detailesTextStyle]}>
               {notificationDetailes}
            </Text>
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '97%',
      backgroundColor: WHITE_COLOR,
      borderRadius: 7,
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
      marginVertical: 10,
   },
   headContainer: {
      width: '99%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
   },
   textAndIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   headText: {
      fontWeight: '900',
      fontSize: 13,
   },
   headIcon: {
      marginHorizontal: 3,
   },
   timeContainer: {
      marginEnd: 3,
   },
   timeText: {
      fontSize: 15,
   },
   detailsContainer: {
      width: '97%',
      alignSelf: 'center',
      marginVertical: 5,
   },
   detailesText: {
      textTransform: 'capitalize',
      textAlign: 'auto',
   },
});

export { NotificationCard };
