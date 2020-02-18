import React from 'react';
import AuthStack from './AuthStack';
import Splash from '../screens/splash';
import HomeStack from './HomeStack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
const AppNavigation = ({ showSplash, showAuth }) => {
   const logedIn = useSelector(state => state.Auth.logedIn);
   console.log(logedIn);

   return (
      <NavigationContainer>
         {showSplash ? <Splash /> : logedIn ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
   );
};

export default AppNavigation;
