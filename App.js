if (__DEV__) {
   import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
   );
}

import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   StatusBar,
   SafeAreaView,
   I18nManager,
} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from './src/navigation';
import FlashMessage from 'react-native-flash-message';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import moment from 'moment';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { MAIN_COLOR } from './src/constants/colors';
const App = () => {
   I18nManager.forceRTL(false);
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <SafeAreaView style={{ flex: 0, backgroundColor: MAIN_COLOR }} />
            <SafeAreaView style={styles.container}>
               <StatusBar
                  backgroundColor={MAIN_COLOR}
                  barStyle="light-content"
               />
               <AppNavigation />
               <FlashMessage
                  floating
                  position="bottom"
                  style={styles.flashMessage}
                  duration={3000}
                  titleStyle={{
                     fontSize: responsiveFontSize(2),
                     textTransform: 'capitalize',
                  }}
               />
            </SafeAreaView>
         </PersistGate>
      </Provider>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   flashMessage: {
      width: '97%',
      alignSelf: 'center',

      justifyContent: 'center',
   },
});

export default App;
