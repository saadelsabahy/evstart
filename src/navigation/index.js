import React from 'react';
import Auth from '../screens/Auth';
import Splash from '../screens/splash';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';
const AppNavigation = ({ showSplash, showAuth }) => {
   return (
      <NavigationContainer>
         {showSplash ? <Splash /> : showAuth ? <Auth /> : <Home />}
      </NavigationContainer>
   );
};

export default AppNavigation;
