import React from 'react';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation';
import store from './src/redux/store';

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
