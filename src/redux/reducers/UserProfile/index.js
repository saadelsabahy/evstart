import {
   USER_CHANGE_PHOTO_SUCCESSFULLY,
   UPDATE_PROFILE_SPINNER,
   UPDATE_PROFILE_FAILED,
   UPDATE_PROFILE_SUCCESS,
   GET_PROFILE_INFO_SPINNER,
   GET_PROFILE_INFO_SUCCESS,
   GET_PROFILE_INFO_FAILED,
   CHANGE_COMMITMENT_SPINNER,
   CHANGE_COMMITMENT_SUCCESS,
   CHANGE_COMMITMENT_FAILED,
   SELECT_ABSENSE_START_DATE,
   SELECT_ABSENSE_END_DATE,
   ABSENSE_REASON_CHANGE,
} from '../../actions/userProfile/UserProfileTypes';

const initialState = {
   image: null,
   showSaveButton: false,
   updateProfileLoader: false,
   updateProfileError: false,
   getInfoLoader: true,
   userInfo: {},
   getUserInfoError: false,
   commitMentLabel: 'this week',
   getCommitmentSpinner: false,
   getCommitmentError: false,
   selectedImage: {},
   absenseStartDate: '',
   absenseEndDate: '',
   absenseReason: '',
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_PROFILE_INFO_SPINNER:
         return {
            ...state,
            getInfoLoader: payload,
            getUserInfoError: false,
         };
         break;
      case GET_PROFILE_INFO_SUCCESS:
         return {
            ...state,
            getInfoLoader: false,
            userInfo: payload,
            getUserInfoError: false,
            image: payload.ParentImageURL,
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
            image: payload.response.uri,
            showSaveButton: payload.showSaveButton,
            selectedImage: payload.response,
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
      case CHANGE_COMMITMENT_SPINNER:
         return {
            ...state,
            commitMentLabel: payload,
            getCommitmentSpinner: true,
            getCommitmentError: false,
         };
         break;
      case CHANGE_COMMITMENT_SUCCESS:
         return {
            ...state,
            getCommitmentSpinner: false,
            userInfo: { ...state.userInfo, Students: payload },
         };
         break;
      case CHANGE_COMMITMENT_FAILED:
         return {
            ...state,
            commitMentLabel: payload,
            getCommitmentSpinner: false,
            getCommitmentError: true,
         };
         break;
      case SELECT_ABSENSE_START_DATE:
         return {
            ...state,
            absenseStartDate: payload,
         };
         break;
      case SELECT_ABSENSE_END_DATE:
         return {
            ...state,
            absenseEndDate: payload,
         };
         break;
      case ABSENSE_REASON_CHANGE:
         return {
            ...state,
            absenseReason: payload,
         };
         break;
      default:
         return state;
   }
};
