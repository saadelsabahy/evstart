import {
   LOGIN_NAME_CHANGE,
   LOGIN_PASSWORD_CHANGE,
} from '../../actions/Auth/AuthTypes';

const initialState = {
   loginName: '',
   loginPassword: '',
   loginLoading: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOGIN_NAME_CHANGE:
         return { ...state, loginName: payload };
         break;
      case LOGIN_PASSWORD_CHANGE:
         return { ...state, loginPassword: payload };
         break;
      default:
         return state;
   }
};
