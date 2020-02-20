import React from 'react';
import AuthStack from './AuthStack';
import Splash from '../screens/splash';
import HomeStack from './HomeStack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
const AppNavigation = ({ showSplash, userToken }) => {
   const logedIn = useSelector(state => state.Auth.logedIn);

   console.log('logedIn', logedIn || userToken, 'log', logedIn);

   return (
      <NavigationContainer>
         {showSplash ? (
            <Splash />
         ) : logedIn || userToken ? (
            <HomeStack />
         ) : (
            <AuthStack />
         )}
      </NavigationContainer>
   );
};

export default AppNavigation;
