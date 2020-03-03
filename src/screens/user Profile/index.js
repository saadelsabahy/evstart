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
   onFilterCommitmentItemPressed,
} from '../../redux/actions';
import styles from './style';
import { CustomDropDown } from '../../components/dropDown';

const UserProfile = ({ navigation }) => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getProfileData());
   }, []);
   const updateProfileLoader = useSelector(
      state => state.UserProfile.updateProfileLoader
   );
   const showSaveButton = useSelector(
      state => state.UserProfile.showSaveButton
   );
   const userInfo = useSelector(state => state.UserProfile.userInfo);
   const getCommitmentSpinner = useSelector(
      state => state.UserProfile.getCommitmentSpinner
   );
   const getInfoLoader = useSelector(state => state.UserProfile.getInfoLoader);

   const getCommitmentError = useSelector(
      state => state.UserProfile.getCommitmentError
   );
   const userProfileImage = useSelector(state => state.UserProfile.image);
   const getUserInfoError = useSelector(
      state => state.UserProfile.getUserInfoError
   );
   const commitMentLabel = useSelector(
      state => state.UserProfile.commitMentLabel
   );
   if (getInfoLoader || getUserInfoError) {
      return (
         <React.Fragment>
            <LoaderAndRetry
               loading={getInfoLoader}
               error={getUserInfoError}
               onRetryPressed={() => dispatch(getProfileData())}
            />
            <IconButton
               iconName={'keyboard-backspace'}
               iconColor="#fff"
               iconSize={25}
               onIconPressed={() => navigation.goBack()}
               touchableStyle={styles.backContainer}
            />
         </React.Fragment>
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
                     <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomDropDown
                           labels={['this week', 'last month']}
                           onMenuItemPressed={(menu, label) =>
                              dispatch(
                                 onFilterCommitmentItemPressed(label, menu)
                              )
                           }
                           selectedItem={commitMentLabel}
                        />
                        <Text>{commitMentLabel}</Text>
                     </View>
                  </View>

                  {getCommitmentError || getCommitmentSpinner ? (
                     <LoaderAndRetry
                        loading={getCommitmentSpinner}
                        error={getCommitmentError}
                        onRetryPressed={() =>
                           dispatch(
                              onFilterCommitmentItemPressed(commitMentLabel)
                           )
                        }
                     />
                  ) : (
                     <FlatList
                        data={Students}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({
                           item: { StudentName, CommitmentPercentage },
                           index,
                        }) => {
                           return (
                              <StudentInfoCard
                                 childName={StudentName}
                                 commitmentPercentage={CommitmentPercentage}
                              />
                           );
                        }}
                        ListEmptyComponent={() => <EmptyList />}
                     />
                  )}
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
