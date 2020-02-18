import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import appReducer from './src/redux/reducer';
import AppNavigator from './src/navigation';

const store = createStore(appReducer);

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    // ...
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
