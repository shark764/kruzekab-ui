import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  loggedIn: false,
  loggedInAs: '',
  token: '',
  userData: {},
  riders: [],
  selectedRiderId: '',
  externalClients: [],
  selectedExternalClientId: '',
  groups: [],
  selectedGroupId: '',
  newUser: {},
  newGroup: {},
  selectedAddress: {
    from: {
      name: 'Current location',
    },
    to: {},
  },
  location: 'to',
  currentPosition: {
    longitude: 90,
    latitude: 180,
  },
  fcmToken: '',
  firebaseInstanceId: '',
  fcmPermissionGranted: false,
  registeredForRemoteNotifications: false,
  notifications: [],
  currentNotificationId: '',
  pushServerToken: '',
});

const getItemIndex = (state, entity, itemId) => state.get(entity).findIndex(item => item.get('id') === itemId);

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(JSON.stringify(action, null, 2));

      return state
        .set('loggedIn', true)
        .set('loggedInAs', action.userType)
        .set('token', action.token)
        .set('userData', action.payload);
    case 'SIGN_UP':
      return state.set('userData', fromJS(action.payload)).set('loggedInAs', action.userType);
    case 'ADD_TO_NEW_USER':
      return state.mergeIn(['newUser'], fromJS(action.payload));
    case 'SET_USER_DATA':
      return state.set('userData', fromJS(action.payload));
    case 'FETCH_RIDERS': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('riders', fromJS(action.payload));
    }
    case 'SET_RIDERS': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('riders', fromJS(action.payload));
    }
    case 'SET_SELECTED_RIDER': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('selectedRiderId', fromJS(action.riderId));
    }
    case 'ADD_RIDER':
      console.log(JSON.stringify(action, null, 2));

      return state.update('riders', riders => riders.push(fromJS(action.payload)));
    case 'UPDATE_RIDER': {
      const itemIndex = getItemIndex(state, 'riders', action.riderId);
      return state.updateIn(['riders', itemIndex], rider => rider.merge(fromJS(action.payload)));
    }
    case 'REMOVE_RIDER': {
      const itemIndex = getItemIndex(state, 'riders', action.riderId);
      return state.deleteIn(['riders', itemIndex]);
    }
    case 'FETCH_GROUPS': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('groups', fromJS(action.payload));
    }
    case 'SET_GROUPS': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('groups', fromJS(action.payload));
    }
    case 'SET_SELECTED_GROUP': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('selectedGroupId', fromJS(action.groupId));
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
    case 'SET_GROUP_RIDERS': {
      console.log(JSON.stringify(action, null, 2));

      const itemIndex = getItemIndex(state, 'groups', action.groupId);
      return state.setIn(['groups', itemIndex, 'riders'], fromJS(action.payload));
    }
    case 'ADD_RIDER_TO_GROUP': {
      console.log(JSON.stringify(action, null, 2));

      const itemIndex = getItemIndex(state, 'groups', action.groupId);
      return state.updateIn(['groups', itemIndex, 'riders'], riders => riders.push(fromJS(action.payload)));
    }
    case 'REMOVE_RIDER_FROM_GROUP': {
      const itemIndex = getItemIndex(state, 'groups', action.groupId);
      return state.updateIn(['groups', itemIndex, 'riders'], riders => {
        const riderIndex = riders.findIndex(rider => rider.get('id') === action.riderId);
        if (riderIndex !== -1) {
          return riders.delete(riderIndex);
        }
        return riders;
      });
    }
    case 'ADD_TO_NEW_GROUP':
      return state.mergeIn(['newGroup'], fromJS(action.payload));
    case 'UPDATE_GROUP_RIDER': {
      const itemIndex = getItemIndex(state, 'groups', action.groupId);
      return state.updateIn(['groups', itemIndex, 'riders'], riders => {
        const riderIndex = riders.findIndex(rider => rider.get('id') === action.riderId);
        if (riderIndex !== -1) {
          return riders.mergeIn([riderIndex], fromJS(action.payload));
        }
        return riders;
      });
    }
    case 'UPDATE_SELECTED_ADDRESS':
      return state.updateIn(['selectedAddress', action.location], selectedAddress => {
        if (selectedAddress) {
          return selectedAddress.merge(fromJS(action.payload));
        }
        return selectedAddress;
      });
    case 'UPDATE_LOCATION':
      return state.set('location', action.location);
    case 'UPDATE_CURRENT_POSITION':
      return state.set('currentPosition', fromJS(action.currentPosition));
    case 'CREATE_USER': {
      // const newUser = state.get('newUser').toJS();
      // console.log('new user', newUser);

      // sendData(newUser);

      return state;
    }
    case 'SET_EXTERNAL_CLIENTS': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('externalClients', fromJS(action.payload));
    }
    case 'SET_SELECTED_EXTERNAL_CLIENT': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('selectedExternalClientId', fromJS(action.clientId));
    }
    case 'SET_EXTERNAL_RIDERS': {
      console.log(JSON.stringify(action, null, 2));

      const itemIndex = getItemIndex(state, 'externalClients', action.clientId);
      return state.setIn(['externalClients', itemIndex, 'riders'], fromJS(action.payload));
    }
    case 'SET_FCM_TOKEN': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('fcmToken', fromJS(action.fcmToken));
    }
    case 'SET_INSTANCE_ID': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('firebaseInstanceId', fromJS(action.iid));
    }
    case 'SET_IS_PERMISSION_GRANTED': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('fcmPermissionGranted', fromJS(action.permissionGranted));
    }
    case 'SET_IS_REGISTERED_FOR_REMOTE_NOTIFICATIONS': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('registeredForRemoteNotifications', fromJS(action.isRegisteredForRemoteNotifications));
    }
    case 'ADD_PUSH_NOTIFICATION': {
      console.log(JSON.stringify(action, null, 2));

      const itemIndex = getItemIndex(state, 'notifications', action.payload.id);
      if (itemIndex !== -1) {
        return state.updateIn(['notifications', itemIndex], notification => notification.merge(fromJS(action.payload)));
      }

      return state.update('notifications', notifications => notifications.push(fromJS(action.payload)));
    }
    case 'SET_PUSH_SERVER_TOKEN': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('pushServerToken', fromJS(action.pushServerToken));
    }
    case 'SET_CURRENT_NOTIFICATION': {
      console.log(JSON.stringify(action, null, 2));

      return state.set('currentNotificationId', fromJS(action.currentNotificationId));
    }
    default:
      return state;
  }
};

export default appReducer;
