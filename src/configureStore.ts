import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import localforage from 'localforage';

const persistConfig = {
  key: 'root',
  storage: localforage,
  blacklist: []
}


const persistedReducer = persistReducer(persistConfig, reducer)


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
  });

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)
