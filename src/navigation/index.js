import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import Splash from '../screens/splash';
import HomeStack from './HomeStack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
const AppNavigation = () => {
   const logedIn = useSelector(state => state.Auth.logedIn);
   const [showSplash, setShowSplash] = useState(true);
   const [userToken, setUserToken] = useState(null);

   useEffect(() => {
      var splashTimeOut = setTimeout(async () => {
         const tkn = await AsyncStorage.getItem('userToken');
         setUserToken(tkn);
         SplashScreen.hide();
      }, 2000);

      return () => {
         clearInterval(splashTimeOut);
      };
   }, []);

   return (
      <NavigationContainer>
         {userToken ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
   );
};

export default AppNavigation;
