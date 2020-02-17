import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const AuthStack = () => {
   const Stack = createStackNavigator();
   return (
      <Stack.Navigator>
         <Stack.Screen
            name={'Login'}
            screenOptions={{
               headerShown: false,
            }}
         />
      </Stack.Navigator>
   );
};

export default AuthStack;
