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
   } else {
      dispatch({ type: LOGIN_SPINNER, payload: true });

      var loginResponse = await get_request({
         target: `UMAPI/api/User/Authenticate?userName=${loginName}&password=${loginPassword}&encrypteddata=${false}`,
      });

      if (loginResponse) {
         const { Id } = loginResponse;
         const sendFcmTokenResponse = await post_request({
            target: 'NESTokens/api/UserNotifications',
            body: { UserID: Id, UsrToken: fcmToken },
         });
         if (sendFcmTokenResponse) {
            await AsyncStorage.multiSet([
               ['userToken', 'tkn'],
               ['userId', `${Id}`],
            ]);
            const id = await AsyncStorage.getItem('userId');

            dispatch({ type: LOGIN_SUCCESS, payload: loginResponse });
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
      await AsyncStorage.clear();
      dispatch({ type: LOGOUT });
      console.log('out');
   } catch (error) {
      console.log(error);
   }
};
