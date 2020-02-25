import { USER_CHANGE_PHOTO_SUCCESSFULLY } from '../../actions/userProfile/UserProfileTypes';

const initialState = {
   image: '',
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case USER_CHANGE_PHOTO_SUCCESSFULLY:
         return { ...state, image: payload };
         break;
      default:
         return state;
   }
};
