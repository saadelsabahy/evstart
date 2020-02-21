import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../screens/Auth';
const AuthStack = () => {
   const Stack = createStackNavigator();
   const config = {
      animation: 'spring',
      config: {
         stiffness: 1000,
         damping: 500,
         mass: 3,
         overshootClamping: true,
         restDisplacementThreshold: 0.01,
         restSpeedThreshold: 0.01,
      },
   };
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}>
         <Stack.Screen
            name={'Login'}
            component={Auth}
            options={{
               transitionSpec: {
                  open: config,
                  close: config,
               },
            }}
         />
      </Stack.Navigator>
   );
};

export default AuthStack;
