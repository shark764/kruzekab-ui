import { combineReducers } from 'redux-immutable';

import appReducer from './appReducer';

const reducers = combineReducers({
  app: appReducer,
});

export default reducers;
