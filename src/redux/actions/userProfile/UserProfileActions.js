import ImagePicker from 'react-native-image-picker';
import {
   USER_CHANGE_PHOTO_SUCCESSFULLY,
   UPDATE_PROFILE_SPINNER,
   UPDATE_PROFILE_SUCCESS,
   GET_PROFILE_INFO_SPINNER,
   GET_PROFILE_INFO_SUCCESS,
   GET_PROFILE_INFO_FAILED,
   UPDATE_PROFILE_FAILED,
} from './UserProfileTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { get_request, post_request } from '../../../utils/api';

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
      target: `EV.UHF.LMS.EncodingTool.API/api/ParentProfile?UserID=${userId}`,
   });

   if (getProfileInfoResponse) {
      console.log('success');
      dispatch({
         type: GET_PROFILE_INFO_SUCCESS,
         payload: getProfileInfoResponse,
      });
   } else {
      console.log('failed');

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
         console.log(response);

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
   console.log(image);

   const form = new FormData();
   form.append('image', {
      uri: image,
      type: 'image/jpg',
      name: 'parentProfile.jpg',
   });
   console.log('update profile Photo pressed', form);
   const UpdateProfilePicture = await post_request({
      target: `EV.UHF.LMS.EncodingTool.API/api/ParentProfile?UserID=${userId}`,
      body: { file: form },
   });
   if (UpdateProfilePicture) {
      dispatch({ type: UPDATE_PROFILE_SUCCESS });
   } else {
      dispatch({ type: UPDATE_PROFILE_FAILED });
   }
};
