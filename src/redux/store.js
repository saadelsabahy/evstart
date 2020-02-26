import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Reactotron from '../../ReactotronConfig';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
   whitelist: ['UserProfile'],
};
const PersistReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
   PersistReducer,
   {},
   compose(applyMiddleware(thunk), Reactotron.createEnhancer())
);
export const persistor = persistStore(store);
