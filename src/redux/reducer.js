import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  loggedIn: false,
  loggedInAs: '',
  userData: {},
  riders: [],
  groups: [],
  newUser: {},
  newGroup: {},
  selectedAddress: {
    from: {
      name: 'Current location'
    },
    to: {}
  },
  location: 'to',
  currentPosition: {
    longitude: 90,
    latitude: 180
  }
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
    case 'ADD_TO_NEW_GROUP':
      return state.mergeIn(['newGroup'], fromJS(action.payload));
    case 'UPDATE_SELECTED_ADDRESS':
      return state.updateIn(['selectedAddress', action.location], selectedAddress => {
        if (selectedAddress) return selectedAddress.merge(fromJS(action.payload));
      });
    case 'UPDATE_LOCATION':
      return state.set('location', action.location);
    case 'UPDATE_CURRENT_POSITION':
      return state.set('currentPosition', fromJS(action.currentPosition));
    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer
});
