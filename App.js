if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigation from './src/navigation';
import FlashMessage from 'react-native-flash-message';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import moment from 'moment';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={'#000'} />
          <AppNavigation />
          <FlashMessage
            position="bottom"
            style={styles.flashMessage}
            duration={3000}
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
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default App;
