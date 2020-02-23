import {
   GET_NOTIFICATION_FAILED,
   GET_NOTIFICATON_SUCCESS,
   GET_NOTIFICATION_LOADER,
} from '../../actions/notification/NotificationTypes';

const initialState = {
   notifications: [],
   getNotificationLoader: false,
   getNotificationError: null,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_NOTIFICATION_FAILED:
         return {
            ...state,
            getNotificationLoader: null,
            getNotificationError: true,
         };
         break;
      case GET_NOTIFICATON_SUCCESS:
         return {
            ...initialState,
            notifications: payload,
         };
         break;
      case GET_NOTIFICATION_LOADER:
         return {
            ...initialState,
            getNotificationLoader: payload,
         };
         break;
      default:
         return state;
   }
};
