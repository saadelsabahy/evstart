import {
   LOGIN_NAME_CHANGE,
   LOGIN_PASSWORD_CHANGE,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   LOGIN_SPINNER,
   LOGOUT,
} from './AuthTypes';
import { get_request } from '../../../utils/api';
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

   if (!(loginName.length && loginPassword.length)) {
      showMessage({
         message: 'name and password are required',
         type: 'warning',
      });
   } else {
      dispatch({ type: LOGIN_SPINNER, payload: true });
      var loginResponse = await get_request({
         target: `User/Authenticate?userName=${loginName}&password=${loginPassword}&encrypteddata=${false}`,
      });
      if (loginResponse) {
         showMessage({
            message: 'login success',
            type: 'success',
         });
         await AsyncStorage.setItem('userToken', 'tkn');

         dispatch({ type: LOGIN_SUCCESS, payload: loginResponse });
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
export const onLogoutPressed = () => async dispatch => {
   await AsyncStorage.removeItem('userToken');
   dispatch({
      type: LOGOUT,
   });
};
