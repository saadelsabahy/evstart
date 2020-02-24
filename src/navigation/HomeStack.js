import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/user Profile';
const HomeStack = () => {
   const Stack = createStackNavigator();
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}
         initialRouteName={'Home'}>
         <Stack.Screen component={Home} name={'Home'} />
         <Stack.Screen component={Profile} name={'Profile'} />
      </Stack.Navigator>
   );
};

export default HomeStack;
