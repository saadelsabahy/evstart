import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, FlatList, Alert, BackHandler } from 'react-native';
import {
   IconButton,
   StudentInfoCard,
   CustomButton,
   EmptyList,
   LoaderAndRetry,
   AbsenseRequestModal,
   CustomText,
} from '../../components';
import Profile from '../../assets/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import {
   changeProfilePicture,
   updateProfilePhoto,
   getProfileData,
   onFilterCommitmentItemPressed,
   handleAbsenseModalUnmount,
   onRequestAbsense,
   discardUpdateProfile,
} from '../../redux/actions';
import styles from './style';
import { CustomDropDown } from '../../components/dropDown';
import { WHITE_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const UserProfile = ({ navigation }) => {
   const dispatch = useDispatch();
   const isFocused = useIsFocused();

   const [showAbsenseRequestModal, setshowAbsenseRequestModal] = useState(
      false
   );
   const [selectedStudent, setselectedStudent] = useState({});
   const {
      updateProfileLoader,
      showSaveButton,
      userInfo,
      getInfoLoader,
      getCommitmentSpinner,
      getCommitmentError,
      userProfileImage,
      getUserInfoError,
      commitMentLabel,
      absenseRequestSpinner,
   } = useSelector(state => ({
      commitMentLabel: state.UserProfile.commitMentLabel,
      getUserInfoError: state.UserProfile.getUserInfoError,
      userProfileImage: state.UserProfile.image,
      getCommitmentError: state.UserProfile.getCommitmentError,
      getInfoLoader: state.UserProfile.getInfoLoader,
      getCommitmentSpinner: state.UserProfile.getCommitmentSpinner,
      userInfo: state.UserProfile.userInfo,
      showSaveButton: state.UserProfile.showSaveButton,
      updateProfileLoader: state.UserProfile.updateProfileLoader,
      absenseRequestSpinner: state.UserProfile.absenseRequestSpinner,
   }));
   useEffect(() => {
      if (isFocused) {
         dispatch(getProfileData());
      } else {
         return;
      }
   }, [isFocused]);
   console.log('img', userProfileImage);

   useFocusEffect(
      React.useCallback(() => {
         const onBackPress = () => {
            if (showSaveButton) {
               shoWingAlert();
               return true;
            } else {
               return false;
            }
         };

         BackHandler.addEventListener('hardwareBackPress', onBackPress);

         return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [showSaveButton, !showSaveButton])
   );
   const onItemPressed = (studentName, schoolId, studentId) => {
      setselectedStudent({ studentName, schoolId, studentId });
      setshowAbsenseRequestModal(true);
   };
   const hideAbsenseRequestModal = () => {
      setshowAbsenseRequestModal(false);
      dispatch(handleAbsenseModalUnmount());
   };
   const onConfirmAbsenceRequest = () => {
      dispatch(onRequestAbsense(selectedStudent, hideAbsenseRequestModal));
   };

   const handleGoback = () => {
      if (!showSaveButton) {
         navigation.goBack();
      } else {
         shoWingAlert();
      }
   };
   const shoWingAlert = () => {
      Alert.alert(
         'save changes',
         'are you sure to save changes ?',
         [
            {
               text: 'discard',
               onPress: () => {
                  dispatch(discardUpdateProfile(navigation));
               },
               style: 'cancel',
            },
            {
               text: 'OK',
               onPress: async () => {
                  dispatch(updateProfilePhoto('back', navigation));
               },
            },
         ],
         { cancelable: false }
      );
   };
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
               <IconButton
                  iconName={'keyboard-backspace'}
                  iconColor={WHITE_COLOR}
                  iconSize={responsiveFontSize(4)}
                  onIconPressed={handleGoback}
                  touchableStyle={styles.backContainer}
               />
            </View>
            {/* profile info......... */}
            <View style={styles.profileCardContainer}>
               <View style={styles.profileImageContainer}>
                  <Image
                     source={
                        userProfileImage ? { uri: userProfileImage } : Profile
                     }
                     style={styles.profileImage}
                  />
                  <IconButton
                     touchableStyle={styles.picImageIcon}
                     iconName={'account-edit'}
                     iconColor="#fff"
                     onIconPressed={() => dispatch(changeProfilePicture())}
                  />
               </View>

               <View style={styles.userInfoContainer}>
                  <CustomText text={ParentName || 'example'} />

                  <CustomText
                     text={Email || 'example@mail.com'}
                     textStyle={{ textTransform: 'none' }}
                  />

                  <CustomText
                     style={[styles.emailAndPhoneTextStyle]}
                     text={Phone || '010055555555'}
                  />
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
                     <CustomText
                        textStyle={styles.studentListTitle}
                        text={'children'}
                     />
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
                        <CustomText text={commitMentLabel} />
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
                        /*  style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }} */
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({
                           item: {
                              StudentName,
                              CommitmentPercentage,
                              SchoolId,
                              StudentId,
                           },
                           index,
                        }) => {
                           return (
                              <StudentInfoCard
                                 childName={StudentName}
                                 commitmentPercentage={`${Number(
                                    Math.floor(
                                       +CommitmentPercentage.substring(
                                          -1,
                                          CommitmentPercentage.indexOf('%')
                                       )
                                    )
                                 ).toFixed()} %`}
                                 onPress={() =>
                                    onItemPressed(
                                       StudentName,
                                       SchoolId,
                                       StudentId
                                    )
                                 }
                              />
                           );
                        }}
                        ListEmptyComponent={() => (
                           <EmptyList emptyText={'no children found'} />
                        )}
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
                  spinnerColor={WHITE_COLOR}
               />
            )}
            <AbsenseRequestModal
               isVisible={showAbsenseRequestModal}
               studentName={
                  selectedStudent.studentName
                     ? selectedStudent.studentName.split(' ')[0]
                     : ''
               }
               hideModal={hideAbsenseRequestModal}
               onConfirmAbsenceRequest={onConfirmAbsenceRequest}
               loading={absenseRequestSpinner}
            />
         </View>
      );
   }
};

export default UserProfile;
