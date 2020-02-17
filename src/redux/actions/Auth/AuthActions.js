import { LOGIN_NAME_CHANGE, LOGIN_PASSWORD_CHANGE } from './AuthTypes';

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

export const onLoginPressed = () => async (dispatch, getState) => {
   console.log('loginPressed');
};
