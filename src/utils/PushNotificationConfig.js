import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
export const PushNotificationConfigration = () => {
   PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
         console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
         console.log('NOTIFICATION:', notification);
         alert('wow...');
         // process the notification here

         // required on iOS only
         notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // Android only
      senderID: '550511065965',
      // iOS only
      permissions: {
         alert: true,
         badge: true,
         sound: true,
      },

      //popInitialNotification: true,
      requestPermissions: true,
   });
};