import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index'; //Import the reducer
//import {saveState, saveStateCorporate} from '../localStorage/localStorage';

//Redux persist
import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
