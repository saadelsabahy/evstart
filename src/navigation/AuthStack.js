import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../screens/Auth';
const AuthStack = () => {
   const Stack = createStackNavigator();
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}>
         <Stack.Screen name={'Login'} component={Auth} />
      </Stack.Navigator>
   );
};

export default AuthStack;
