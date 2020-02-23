const base_url = 'http://30095b70.ngrok.io/';
export const image_url = base_url;

import AsyncStorage from '@react-native-community/async-storage';

// get request
export const get_request = async ({ target }) => {
   const url = `${base_url}/${target}`;

   const access_token = await AsyncStorage.getItem('userToken');
   console.log('access token>>>', access_token);
   try {
      const result = await fetch(url, {
         method: 'GET',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: access_token ? `Bearer ${access_token}` : '',
         },
      });
      return await result.json();
   } catch (err) {
      console.log('------------------PUT  REQUEST ERROR------------------');
      console.log(err);
      console.log('------------------PUT  REQUEST ERROR------------------');
   }
};

// post request
export const post_request = async ({ target, body = {} }) => {
   const url = `${base_url}/${target}`;
   const access_token = await AsyncStorage.getItem('userToken');

   try {
      const result = await fetch(url, {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: access_token ? `Bearer ${access_token}` : '',
         },
         body: JSON.stringify(body),
      });
      return await result.json();
   } catch (err) {
      console.log('------------------PUT  REQUEST ERROR------------------');
      console.log(err);
      console.log('------------------PUT  REQUEST ERROR------------------');
   }
};

export const put_request = async ({ target, body = {} }) => {
   const url = `${base_url}/api/${target}`;
   console.log('url>>>', url);

   console.log('body>>>', JSON.stringify(body));
   const access_token = await AsyncStorage.getItem('userToken');
   console.log('access token>>>', access_token);

   try {
      const result = await fetch(url, {
         method: 'PUT',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: access_token ? `Bearer ${access_token}` : '',
         },
         body: JSON.stringify(body),
      });
      console.log('---------------------PUT  REQUEST---------------------');
      console.log(result);
      console.log('---------------------PUT  REQUEST---------------------');
      return await result.json();
      // console.log('PUT_response',await result.json())
   } catch (err) {
      console.log('------------------PUT  REQUEST ERROR------------------');
      console.log(err);
      console.log('------------------PUT  REQUEST ERROR------------------');
   }
};

export const delete_request = async ({ target }) => {
   const url = `${base_url}/api/${target}`;
   console.log('url>>>', url);

   const access_token = await AsyncStorage.getItem('userToken');
   console.log('access token>>>', access_token);

   try {
      const result = await fetch(url, {
         method: 'DELETE',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: access_token ? `Bearer ${access_token}` : '',
         },
      });
      console.log('---------------------DELETE  REQUEST---------------------');
      console.log(result);
      console.log('---------------------DELETE  REQUEST---------------------');
      return await result.json();
      // console.log('DELETE_response',await result.json())
   } catch (err) {
      console.log('------------------DELETE  REQUEST ERROR------------------');
      console.log(err);
      console.log('------------------DELETE  REQUEST ERROR------------------');
   }
};
