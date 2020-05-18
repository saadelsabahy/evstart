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
   const [userToken, setUserToken] = useState(
      AsyncStorage.getItem('userToken', (err, res) => setUserToken(res))
   );

   useEffect(() => {
      var splashTimeOut = setTimeout(async () => {
         SplashScreen.hide();
         // setShowSplash(false);
      }, 950);

      return () => {
         clearInterval(splashTimeOut);
      };
   }, [userToken]);

   return (
      <NavigationContainer>
         {userToken ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
   );
};

export default AppNavigation;
