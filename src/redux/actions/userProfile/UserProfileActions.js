import ImagePicker from 'react-native-image-picker';
import {
   USER_CHANGE_PHOTO_SUCCESSFULLY,
   UPDATE_PROFILE_SPINNER,
   UPDATE_PROFILE_SUCCESS,
   GET_PROFILE_INFO_SPINNER,
   GET_PROFILE_INFO_SUCCESS,
   GET_PROFILE_INFO_FAILED,
   UPDATE_PROFILE_FAILED,
   CHANGE_COMMITMENT_SPINNER,
   CHANGE_COMMITMENT_SUCCESS,
   CHANGE_COMMITMENT_FAILED,
} from './UserProfileTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { get_request, post_request } from '../../../utils/api';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { log } from 'react-native-reanimated';
import moment from 'moment';
const currentWeekStart = moment()
   .startOf('week')
   .format('YYYY-MM-DD');
const currentWeekEnd = moment()
   .endOf('week')
   .format('YYYY-MM-DD');
const lastMonthStart = moment()
   .subtract(1, 'month')
   .startOf('month')
   .format('YYYY-MM-DD');
const endOfLastMonth = moment()
   .subtract(1, 'month')
   .endOf('month')
   .format('YYYY-MM-DD');

const options = {
   title: 'Select Avatar',
   storageOptions: {
      skipBackup: true,
      path: 'images',
   },
};
export const getProfileData = () => async (dispatch, getState) => {
   dispatch({ type: GET_PROFILE_INFO_SPINNER, payload: true });
   const userId = await AsyncStorage.getItem('userId');
   const getProfileInfoResponse = await get_request({
      target: `EV.UHF.LMS.EncodingTool.API/api/ParentProfile?UserID=${userId}&From=${currentWeekStart}&To=${currentWeekEnd}`,
   });

   if (getProfileInfoResponse) {
      dispatch({
         type: GET_PROFILE_INFO_SUCCESS,
         payload: getProfileInfoResponse,
      });
   } else {
      dispatch({ type: GET_PROFILE_INFO_FAILED });
   }
};

export const changeProfilePicture = () => async (dispatch, getState) => {
   ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
         console.log('User cancelled image picker');
      } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
      } else {
         const source = { uri: response.uri };
         dispatch({
            type: USER_CHANGE_PHOTO_SUCCESSFULLY,
            payload: { source, showSaveButton: true },
         });
      }
   });
};

export const updateProfilePhoto = () => async (dispatch, getState) => {
   dispatch({ type: UPDATE_PROFILE_SPINNER, payload: true });
   const { image } = getState().UserProfile;
   const userId = await AsyncStorage.getItem('userId');

   const form = new FormData();
   form.append('image', {
      uri: image,
      type: 'image/jpg',
      name: 'parentProfile.jpg',
   });
   console.log('new profile picture', form);

   const UpdateProfilePicture = await post_request({
      target: `EV.UHF.LMS.EncodingTool.API/api/ParentProfile?UserID=${userId}`,
      body: { file: form },
   });
   if (!UpdateProfilePicture) {
      dispatch({ type: UPDATE_PROFILE_SUCCESS });
      showMessage({
         message: 'update profile success',
         type: 'success',
      });
   } else {
      dispatch({ type: UPDATE_PROFILE_FAILED });
      showMessage({
         message: 'update profile failed',
         type: 'danger',
         position: 'top',
      });
   }
};

export const onFilterCommitmentItemPressed = (label, menu) => async (
   dispatch,
   getState
) => {
   menu.hide();
   dispatch({ type: CHANGE_COMMITMENT_SPINNER, payload: label });
   const { commitMentLabel } = getState().UserProfile;
   const userId = await AsyncStorage.getItem('userId');

   const getCommitmentResponse = await get_request({
      target: `EV.UHF.LMS.EncodingTool.API/api/ParentProfile?UserID=${userId}&From=${
         commitMentLabel === 'this week' ? currentWeekStart : lastMonthStart
      }&To=${
         commitMentLabel === 'this week' ? currentWeekEnd : endOfLastMonth
      }`,
   });

   if (getCommitmentResponse) {
      dispatch({
         type: CHANGE_COMMITMENT_SUCCESS,
         payload: getCommitmentResponse.Students,
      });
   } else {
      dispatch({ type: CHANGE_COMMITMENT_FAILED });
   }
};
