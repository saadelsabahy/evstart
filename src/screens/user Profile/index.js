import React, { useEffect, useRef } from 'react';
import {
   View,
   Text,
   Image,
   ScrollView,
   FlatList,
   ActivityIndicator,
} from 'react-native';
import {
   IconButton,
   StudentInfoCard,
   CustomButton,
   EmptyList,
   LoaderAndRetry,
} from '../../components';
import Profile from '../../assets/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import {
   changeProfilePicture,
   updateProfilePhoto,
   getProfileData,
} from '../../redux/actions';
import styles from './style';
import { CustomDropDown } from '../../components/dropDown';

const UserProfile = ({ navigation }) => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getProfileData());
      /* dispatch(updateProfilePhoto()); */
   }, []);
   const updateProfileLoader = useSelector(
      state => state.UserProfile.updateProfileLoader
   );
   const showSaveButton = useSelector(
      state => state.UserProfile.showSaveButton
   );
   const userInfo = useSelector(state => state.UserProfile.userInfo);
   const getInfoLoader = useSelector(state => state.UserProfile.getInfoLoader);
   const userProfileImage = useSelector(state => state.UserProfile.image);
   const getUserInfoError = useSelector(
      state => state.UserProfile.getUserInfoError
   );
   console.log('getInfoLoader', getUserInfoError);

   if (getInfoLoader || getUserInfoError) {
      return (
         <LoaderAndRetry
            loading={getInfoLoader}
            error={getUserInfoError}
            onRetryPressed={() => dispatch(getProfileData())}
         />
      );
   } else {
      const { ParentName, Email, Phone, Students } = userInfo;

      return (
         <View style={styles.container}>
            {/* header..... */}
            <View style={styles.headerImageContainer}>
               <Image
                  source={{
                     uri:
                        'https://cdn.pixabay.com/photo/2016/08/05/09/31/banner-1571858__340.jpg',
                  }}
                  style={styles.headerImage}
               />
               <IconButton
                  iconName={'keyboard-backspace'}
                  iconColor="#fff"
                  iconSize={25}
                  onIconPressed={() => navigation.goBack()}
                  touchableStyle={styles.backContainer}
               />
            </View>
            {/* profile info......... */}
            <View style={styles.profileCardContainer}>
               <View style={styles.profileImageContainer}>
                  <Image
                     source={
                        userProfileImage
                           ? { uri: userProfileImage.uri }
                           : Profile
                     }
                     style={styles.profileImage}
                  />
                  <IconButton
                     touchableStyle={styles.picImageIcon}
                     iconName={'account-edit'}
                     iconColor="#fff"
                     iconSize={30}
                     onIconPressed={() => dispatch(changeProfilePicture())}
                  />
               </View>

               <View style={styles.userInfoContainer}>
                  <Text style={styles.nameTextStyle}>
                     {ParentName || 'example'}
                  </Text>
                  <Text style={[styles.emailAndPhoneTextStyle]}>
                     {Email || 'example@mail.com'}
                  </Text>
                  <Text style={[styles.emailAndPhoneTextStyle]}>
                     {Phone || '010055555555'}
                  </Text>
               </View>
            </View>
            {/* children info */}
            <View style={styles.studentsListContainer}>
               <View style={styles.studentsListContentContainer}>
                  <View
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                     }}>
                     <Text style={styles.studentListTitle}>children</Text>
                     <CustomDropDown
                        labels={['this weak', 'this month']}
                        onMenuItemPressed={menu => menu.hide()}
                     />
                  </View>
                  <FlatList
                     data={Students}
                     keyExtractor={(item, index) => `${index}`}
                     renderItem={({ item: { StudentName }, index }) => {
                        return <StudentInfoCard childName={StudentName} />;
                     }}
                     ListEmptyComponent={() => <EmptyList />}
                  />
               </View>
            </View>
            {showSaveButton && (
               <CustomButton
                  buttonTitle="save changes"
                  buttonContainerStyle={styles.saveButton}
                  onButtonPressed={() => dispatch(updateProfilePhoto())}
                  loading={updateProfileLoader}
                  spinnerColor={'#fff'}
               />
            )}
         </View>
      );
   }
};

export default UserProfile;
