import React from 'react';
import { Provider } from 'react-redux';

import App from './App';
import store from './src/redux/store';

console.disableYellowBox = true;

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
