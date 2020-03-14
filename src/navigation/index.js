import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import Splash from '../screens/splash';
import HomeStack from './HomeStack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
const AppNavigation = () => {
   const [showSplash, setShowSplash] = useState(true);
   const [userToken, setUserToken] = useState(
      AsyncStorage.getItem('userToken', (err, res) => setUserToken(res))
   );

   useEffect(() => {
      var splashTimeOut = setTimeout(async () => {
         setShowSplash(false);
      }, 950);

      return () => {
         clearInterval(splashTimeOut);
      };
   }, [userToken]);

   return (
      <NavigationContainer>
         {showSplash ? <Splash /> : userToken ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
   );
};

export default AppNavigation;
