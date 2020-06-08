import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   Platform,
   TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WHITE_COLOR, BLACK_COLOR, MAIN_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText } from '../customText';

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
                  size={notificationIconSize || responsiveFontSize(4)}
                  color={MAIN_COLOR}
               />
               <CustomText
                  textStyle={[styles.headText, notificationNameStyle]}
                  text={notificationName}
               />
            </View>
            <View style={[styles.timeContainer, timeContainerStyle]}>
               <CustomText
                  textStyle={[styles.timeText, timeTextStyle]}
                  text={notificationTimeText}
               />
            </View>
         </View>
         <View style={[styles.detailsContainer, detailesContainerStyle]}>
            <CustomText
               textStyle={[styles.detailesText, detailesTextStyle]}
               text={notificationDetailes}
            />
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '97%',
      backgroundColor: WHITE_COLOR,
      borderRadius: 10,
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
      padding: 10,
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
      fontSize: responsiveFontSize(2.1),
      color: '#888',
   },
   headIcon: {
      marginHorizontal: 3,
   },
   timeContainer: {
      marginEnd: 3,
   },
   timeText: {
      fontSize: responsiveFontSize(2.1),
      color: '#888',
   },
   detailsContainer: {
      width: '97%',
      alignSelf: 'center',
      marginVertical: 5,
   },
   detailesText: {
      textTransform: 'capitalize',
      textAlign: 'auto',
      letterSpacing: 1.3,
      color: '#222',
   },
});

export { NotificationCard };
