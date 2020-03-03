import { StyleSheet } from 'react-native';
import { BLACK_COLOR } from '../../constants/colors';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   backContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(0,0,0,.2)',
      position: 'absolute',
      start: 10,
      top: 10,
   },
   headerImageContainer: {
      width: '100%',
      height: '17%',
      backgroundColor: '#eee',
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
      width: 100,
      height: 100,
      borderRadius: 50,
      overflow: 'visible',
      backgroundColor: BLACK_COLOR,
   },
   profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 50,
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
      textTransform: 'capitalize',
      fontSize: 15,
      color: '#999',
      letterSpacing: 0.8,
   },
   saveButton: {
      width: '100%',
      height: 40,
      borderRadius: 0,
      marginVertical: 3,
   },
});

export default styles;
