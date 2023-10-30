import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, useDispatch } from 'react-redux'
import { persistor, store } from './configureStore'
import { fetchInitialData } from './pokemon/sagas';

import './scss/index.scss'
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
store.dispatch(fetchInitialData());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

