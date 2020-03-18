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
import moment from 'moment';
import { Platform } from 'react-native';

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
   console.log('called.....');

   dispatch({ type: GET_PROFILE_INFO_SPINNER, payload: true });
   const userId = await AsyncStorage.getItem('userId');
   const getProfileInfoResponse = await get_request({
      target: `NESAPI/api/ParentProfile?UserID=${userId}&From=${currentWeekStart}&To=${currentWeekEnd}`,
   });
   console.log(getProfileInfoResponse);

   if (getProfileInfoResponse.statusCode === 200) {
      dispatch({
         type: GET_PROFILE_INFO_SUCCESS,
         payload: getProfileInfoResponse.data,
      });
   } else {
      dispatch({ type: GET_PROFILE_INFO_FAILED });
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
      target: `NESAPI/api/ParentProfile?UserID=${userId}&From=${
         commitMentLabel === 'this week' ? currentWeekStart : lastMonthStart
      }&To=${
         commitMentLabel === 'this week' ? currentWeekEnd : endOfLastMonth
      }`,
   });

   if (getCommitmentResponse.statusCode == 200) {
      dispatch({
         type: CHANGE_COMMITMENT_SUCCESS,
         payload: getCommitmentResponse.data.Students,
      });
   } else {
      dispatch({ type: CHANGE_COMMITMENT_FAILED });
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
            payload: { response, showSaveButton: true },
         });
      }
   });
};

export const updateProfilePhoto = () => async (dispatch, getState) => {
   dispatch({ type: UPDATE_PROFILE_SPINNER, payload: true });
   const {
      selectedImage: { uri, type, fileName },
   } = getState().UserProfile;
   const userId = await AsyncStorage.getItem('userId');
   const form = new FormData();
   form.append('image', {
      uri: Platform.OS == 'android' ? uri : uri.replace('file://', ''),
      type,
      name: fileName,
   });
   console.log(form);

   try {
      const UpdateProfilePicture = await post_request({
         target: `NESAPI/api/ParentProfile?UserID=${userId}`,
         body: form,
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });

      if (UpdateProfilePicture.statusCode === 200) {
         dispatch({ type: UPDATE_PROFILE_SUCCESS });
         showMessage({
            message: 'update profile success',
            type: 'success',
         });
      } else {
         updateProfileFailed(dispatch);
      }
   } catch (error) {
      updateProfileFailed(dispatch);
   }
};
const updateProfileFailed = dispatch => {
   dispatch({ type: UPDATE_PROFILE_FAILED });

   showMessage({
      message: 'update profile failed',
      type: 'danger',
      position: 'top',
   });
};
