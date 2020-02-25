import ImagePicker from 'react-native-image-picker';
import { USER_CHANGE_PHOTO_SUCCESSFULLY } from './UserProfileTypes';

const options = {
   title: 'Select Avatar',
   storageOptions: {
      skipBackup: true,
      path: 'images',
   },
};
export const changeProfilePicture = () => async (dispatch, getState) => {
   ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
         console.log('User cancelled image picker');
      } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
      } else {
         console.log(response);

         const source = { uri: response.uri };
         dispatch({ type: USER_CHANGE_PHOTO_SUCCESSFULLY, payload: source });
      }
   });
};
