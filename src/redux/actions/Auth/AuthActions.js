import {
   LOGIN_NAME_CHANGE,
   LOGIN_PASSWORD_CHANGE,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   LOGIN_SPINNER,
   LOGOUT,
} from './AuthTypes';
import { get_request, post_request } from '../../../utils/api';
import { showMessage, hideMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
export const onInputsChange = (inputName, inputValue) => {
   switch (inputName) {
      case 'loginName':
         return { type: LOGIN_NAME_CHANGE, payload: inputValue };
         break;
      case 'loginPassword':
         return { type: LOGIN_PASSWORD_CHANGE, payload: inputValue };
         break;
   }
};

export const onLoginPressed = navigation => async (dispatch, getState) => {
   const { loginName, loginPassword } = getState().Auth;
   const fcmToken = await AsyncStorage.getItem('fcmToken');

   if (!(loginName.length && loginPassword.length)) {
      showMessage({
         message: 'name and password are required',
         type: 'warning',
      });
   } else if (loginPassword.length < 6) {
      showMessage({
         message: 'password must be at least 6 characters',
         type: 'warning',
      });
   } else if (loginName.length < 2) {
      showMessage({
         message: 'name must be at least 2 characters',
         type: 'warning',
      });
   } else {
      dispatch({ type: LOGIN_SPINNER, payload: true });
      var loginResponse = await get_request({
         target: `UMAPI/api/User/Authenticate?userName=${loginName}&password=${loginPassword}&encrypteddata=${false}`,
      });

      try {
         if (loginResponse.statusCode == 200) {
            const {
               data: { Id },
            } = loginResponse;
            const body = JSON.stringify({ UserID: Id, UsrToken: fcmToken });
            const sendFcmTokenResponse = await post_request({
               target: 'NESTokens/api/UserNotifications',
               body,
            });
            console.log('sendFcmTokenResponse', sendFcmTokenResponse);

            if (sendFcmTokenResponse.statusCode == 200) {
               dispatch({ type: LOGIN_SUCCESS });
               await AsyncStorage.setItem('userId', `${Id}`);

               showMessage({
                  message: 'login success',
                  type: 'success',
               });
            } else {
               loginFailed(dispatch);
            }
         } else {
            loginFailed(dispatch);
         }
      } catch (error) {
         loginFailed(dispatch);
         console.log('loginError', error);
      }
   }
};
const loginFailed = dispatch => {
   dispatch({ type: LOGIN_FAILED });
   showMessage({
      message: 'login failed',
      type: 'danger',
   });
};
//logout
export const onLogoutPressed = navigation => async dispatch => {
   try {
      await firebase.messaging().deleteToken();
      dispatch({ type: LOGOUT });
      await AsyncStorage.clear();
   } catch (error) {
      console.log('logout error', error);
      firebase.crashlytics('SIGN_OUT', error.message);
   }
};
