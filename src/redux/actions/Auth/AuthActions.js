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
      console.log(loginName, loginPassword);

      var loginResponse = await get_request({
         target: `Components.UserManagement.WebAPI/api/User/Authenticate?userName=${loginName}&password=${loginPassword}&encrypteddata=${false}`,
      });

      if (loginResponse) {
         showMessage({
            message: 'login success',
            type: 'success',
         });
         await AsyncStorage.setItem('userToken', 'tkn');
         dispatch({ type: LOGIN_SUCCESS, payload: loginResponse });
         const sendFcmTokenResponse = await post_request({
            target:
               'EV.UHF.LMS.EncodingTool.Notifications.API/api/UserNotifications',
            body: { UserID: loginResponse.Id, UsrToken: fcmToken },
         });
         console.log('sendFcmTokenResponse', sendFcmTokenResponse);
      } else {
         dispatch({ type: LOGIN_FAILED });
         showMessage({
            message: 'login failed',
            type: 'danger',
         });
      }
   }
};
//logout
export const onLogoutPressed = navigation => async dispatch => {
   console.log('logout pressed');

   await AsyncStorage.removeItem('userToken');
   dispatch({ type: LOGOUT });
};
