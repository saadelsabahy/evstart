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
   SELECT_ABSENSE_START_DATE,
   SELECT_ABSENSE_END_DATE,
   ABSENSE_REASON_CHANGE,
   ABSENSE_REQUEST_FAILED,
   ABSENSE_REQUEST_SPINNER,
   ABSENSE_REQUEST_SUCCESS,
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
   dispatch({ type: GET_PROFILE_INFO_SPINNER, payload: true });
   const userId = await AsyncStorage.getItem('userId');
   const getProfileInfoResponse = await get_request({
      target: `NESAPI/api/ParentProfile?UserID=${userId}&From=${currentWeekStart}&To=${currentWeekEnd}`,
   });

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
   ImagePicker.showImagePicker(
      {
         ...options,
         maxWidth: 200,
         maxHeight: 200,
         quality: 0.7,
         mediaType: 'photo',
      },
      response => {
         if (response.didCancel) {
            console.log('User cancelled image picker');
         } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
         } else {
            const source = { uri: response.uri };

            dispatch({
               type: USER_CHANGE_PHOTO_SUCCESSFULLY,
               payload: { response, showSaveButton: true },
            });
         }
      }
   );
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
            duration: 2000,
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

///absense request
export const onConfirmSelectDate = (date, currentActive, hideDatePicker) => (
   dispatch,
   getState
) => {
   console.log('currentActive', currentActive);

   switch (currentActive) {
      case 'startDate':
         /*  moment(date)
               .format('DD-MM-YYYY')
               .toString() */
         dispatch({
            type: SELECT_ABSENSE_START_DATE,
            payload: moment(date)
               .format('DD-MM-YYYY')
               .toString(),
         });
         break;

      case 'endDate':
         const { absenseStartDate } = getState().UserProfile;
         const isEndDateValid = moment(date).isSameOrAfter(
            moment(absenseStartDate, 'DD-MM-YYYY')
         );
         if (isEndDateValid) {
            dispatch({
               type: SELECT_ABSENSE_END_DATE,
               payload: moment(date)
                  .format('DD-MM-YYYY')
                  .toString(),
            });
         } else {
            /* modalMessage.current.showMessage({
               type: 'danger',
               message: 'تاريخ الانتهاء يجب ان يكون بعد تاريخ البدايه',
            }); */
            dispatch({
               type: SELECT_ABSENSE_END_DATE,
               payload: '',
            });
         }
         break;
   }
   // hideDatePicker;
};
export const onAbsenseReasonChange = text => dispatch => {
   dispatch({ type: ABSENSE_REASON_CHANGE, payload: text });
};
export const handleAbsenseModalUnmount = () => dispatch => {
   dispatch({
      type: SELECT_ABSENSE_START_DATE,
      payload: '',
   });

   dispatch({
      type: SELECT_ABSENSE_END_DATE,
      payload: '',
   });
};
/////
export const onRequestAbsense = (
   { studentName, schoolId, studentId },
   hideModal
) => async (dispatch, getState) => {
   const {
      absenseStartDate,
      absenseEndDate,
      absenseReason,
   } = getState().UserProfile;
   try {
      dispatch({ type: ABSENSE_REQUEST_SPINNER });
      const parentId = await AsyncStorage.getItem('userId');
      const requestBody = JSON.stringify({
         SchoolId: schoolId,
         StudentCode: studentId,
         ParentId: parentId,
         AbsanceReason: absenseReason,
         DateFrom: moment(absenseStartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
         DateTo: moment(absenseEndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      });
      const AbsenseRequestResponse = await post_request({
         target: 'NESAPI/api/AbsanceRequests',
         body: requestBody,
      });
      if (AbsenseRequestResponse.statusCode) {
         await dispatch({ type: ABSENSE_REQUEST_SUCCESS });
         hideModal();
         showMessage({
            type: 'success',
            message: 'your request sent..',
            duration: 2000,
         });
      }
   } catch (error) {
      console.log('absense Request Error', error);
      dispatch({ type: ABSENSE_REQUEST_FAILED });
   }
};
