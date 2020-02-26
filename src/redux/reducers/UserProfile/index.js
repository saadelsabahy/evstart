import {
   USER_CHANGE_PHOTO_SUCCESSFULLY,
   UPDATE_PROFILE_SPINNER,
   UPDATE_PROFILE_FAILED,
   UPDATE_PROFILE_SUCCESS,
   GET_PROFILE_INFO_SPINNER,
   GET_PROFILE_INFO_SUCCESS,
   GET_PROFILE_INFO_FAILED,
} from '../../actions/userProfile/UserProfileTypes';

const initialState = {
   image: '',
   showSaveButton: false,
   updateProfileLoader: false,
   updateProfileError: false,
   getInfoLoader: false,
   userInfo: {},
   getUserInfoError: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_PROFILE_INFO_SPINNER:
         return {
            ...state,
            getInfoLoader: payload,
         };
         break;
      case GET_PROFILE_INFO_SUCCESS:
         return {
            ...state,
            getInfoLoader: false,
            userInfo: payload,
         };
         break;
      case GET_PROFILE_INFO_FAILED:
         return {
            ...state,
            getInfoLoader: false,
            getUserInfoError: true,
         };
         break;
      case USER_CHANGE_PHOTO_SUCCESSFULLY:
         return {
            ...state,
            image: payload.source,
            showSaveButton: payload.showSaveButton,
         };
         break;
      case UPDATE_PROFILE_SPINNER:
         return {
            ...state,
            updateProfileLoader: payload,
            updateProfileError: false,
         };
         break;
      case UPDATE_PROFILE_FAILED:
         return {
            ...state,
            updateProfileLoader: false,
            updateProfileError: true,
         };
         break;
      case UPDATE_PROFILE_SUCCESS:
         return {
            ...state,
            showSaveButton: false,
            updateProfileLoader: false,
            updateProfileError: true,
         };
         break;
      default:
         return state;
   }
};
