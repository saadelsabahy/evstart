import { StyleSheet, Dimensions } from 'react-native';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   backContainer: {
      borderRadius: Math.round(height / 2 + width / 2),
      width: Math.round(height / 2 + width / 2) / 12,
      height: Math.round(height / 2 + width / 2) / 12,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,.2)',
      position: 'absolute',
      start: 10,
      top: 10,
   },
   headerImageContainer: {
      width: '100%',
      height: '17%',
      backgroundColor: MAIN_COLOR,
   },
   headerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
   },
   profileCardContainer: {
      borderStartColor: '#ddd',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: '#999',
      top: '-5%',
   },
   profileImageContainer: {
      alignSelf: 'center',
      borderRadius: Math.round(height / 2 + width / 2),
      width: Math.round(height / 2 + width / 2) / 5,
      height: Math.round(height / 2 + width / 2) / 5,
      overflow: 'visible',
      backgroundColor: MAIN_COLOR,
      borderWidth: 1,
      borderColor: WHITE_COLOR,
   },
   profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: Math.round(height / 2 + width / 2),
   },
   picImageIcon: {
      position: 'absolute',
      bottom: -10,
      end: -10,
      alignSelf: 'flex-end',
      width: 45,
      height: 45,
      borderRadius: 22.5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,.2)',
   },
   userInfoContainer: {
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 5,
   },
   nameTextStyle: {
      marginVertical: 3,
      fontSize: 18,
      fontWeight: '400',
   },
   emailAndPhoneTextStyle: {
      marginBottom: 5,
      fontSize: 15,
   },
   studentsListContainer: {
      flex: 1,
      top: 0,
   },
   studentsListContentContainer: {
      width: '95%',
      height: '100%',
      alignSelf: 'center',
      marginVertical: 5,
      top: '-5%',
   },
   studentListTitle: {
      color: '#999',
      letterSpacing: 0.8,
   },
   saveButton: {
      width: '100%',
      height: height / 15,
      borderRadius: 0,
      marginVertical: 3,
   },
});

export default styles;
