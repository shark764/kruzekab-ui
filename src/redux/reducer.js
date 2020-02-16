import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  loggedIn: false,
  loggedInAs: '',
  userData: {},
  riders: [],
  groups: [],
  newUser: {}
});

const getItemIndex = (state, entity, itemId) => state.get(entity).findIndex(item => item.get('id') === itemId);

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return state.set('loggedIn', true).set('loggedInAs', action.userType);
    case 'SIGN_UP':
      return state.set('userData', fromJS(action.payload)).set('loggedInAs', action.userType);
    case 'ADD_TO_NEW_USER':
      return state.mergeIn(['newUser'], fromJS(action.payload));
    case 'SET_USER_DATA':
      return state.set('userData', fromJS(action.payload));
    case 'ADD_RIDER':
      return state.update('riders', riders => riders.push(fromJS(action.payload)));
    case 'UPDATE_RIDER': {
      const itemIndex = getItemIndex(state, 'riders', action.riderId);
      return state.updateIn(['riders', itemIndex], rider => rider.merge(fromJS(action.payload)));
    }
    case 'REMOVE_RIDER': {
      const itemIndex = getItemIndex(state, 'riders', action.riderId);
      return state.deleteIn(['riders', itemIndex]);
    }
    case 'ADD_GROUP':
      return state.update('groups', groups => groups.push(fromJS(action.payload)));
    case 'UPDATE_GROUP': {
      const itemIndex = getItemIndex(state, 'groups', action.groupId);
      return state.updateIn(['groups', itemIndex], group => group.merge(fromJS(action.payload)));
    }
    case 'REMOVE_GROUP': {
      const itemIndex = getItemIndex(state, 'groups', action.groupId);
      return state.deleteIn(['groups', itemIndex]);
    }
    case 'ADD_RIDER_TO_GROUP': {
      const itemIndex = getItemIndex(state, 'groups', action.groupId);
      return state.updateIn(['groups', itemIndex, 'riders'], riders => {
        if (!riders) {
          return fromJS([action.riderId]);
        }
        return riders.push(action.riderId);
      });
    }
    case 'REMOVE_RIDER_FROM_GROUP': {
      const itemIndex = getItemIndex(state, 'groups', action.groupId);
      return state.updateIn(['groups', itemIndex, 'riders'], riders => {
        const riderIndex = riders.findIndex(rider => rider.get('id') === action.riderId);
        if (entityIndex !== -1) {
          return riders.delete(riderIndex);
        }
        return riders;
      });
    }
    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer
});
