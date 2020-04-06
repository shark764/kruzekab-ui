import { List } from 'immutable';

export const getAllRiders = state => state.getIn(['app', 'riders'], new List([]));

export const getAllGroups = state => state.getIn(['app', 'groups'], new List([]));

export const getRider = (state, riderId) => state.getIn(['app', 'riders'], new List([])).find(rider => rider.get('id') === riderId);

export const getSelectedRiderId = state => state.getIn(['app', 'selectedRiderId']);

export const getSelectedRider = state => state.getIn(['app', 'riders'], new List([])).find(rider => rider.get('id') === getSelectedRiderId(state));

export const getGroup = (state, groupId) => state.getIn(['app', 'groups'], new List([])).find(group => group.get('id') === groupId);

export const getSelectedGroupId = state => state.getIn(['app', 'selectedGroupId']);

export const getSelectedGroup = state => state.getIn(['app', 'groups'], new List([])).find(group => group.get('id') === getSelectedGroupId(state));

export const getAllRidersByGroup = (state, groupId) => getGroup(state, groupId).get('riders') || new List([]);

export const getAllRidersBySelectedGroup = state => getSelectedGroup(state).get('riders') || new List([]);

export const getNewUserData = state => state.getIn(['app', 'newUser']);

export const getUserToken = state => state.getIn(['app', 'token']);

export const getNewGroupData = state => state.getIn(['app', 'newGroup']);

export const getSelectedAddress = state => state.getIn(['app', 'selectedAddress']);

export const getLocation = state => state.getIn(['app', 'location']);

export const getCurrentPosition = state => state.getIn(['app', 'currentPosition']);

export const getNewDriver = state => state.getIn(['app', 'newUser']);

export const getNewGroup = state => state.getIn(['app', 'newGroup']);

export const getUserData = state => state.getIn(['app', 'userData']);

export const getUserId = state => state.getIn(['app', 'userData', 'id']);

export const getClientData = state => state.getIn(['app', 'userData', 'client']);

export const getClientId = state => state.getIn(['app', 'userData', 'client', 'id']);

export const getDriverData = state => state.getIn(['app', 'userData', 'driver']);

export const getDriverId = state => state.getIn(['app', 'userData', 'driver', 'id']);

export const getAllExternalClients = state => state.getIn(['app', 'externalClients'], new List([]));

export const getExternalClient = (state, clientId) => getAllExternalClients(state).find(client => client.get('id') === clientId);

export const getSelectedExternalClientId = state => state.getIn(['app', 'selectedExternalClientId']);

export const getSelectedExternalClient = state => getAllExternalClients(state).find(client => client.get('id') === getSelectedExternalClientId(state));

export const getAllExternalRidersByClient = (state, clientId) => getExternalClient(state, clientId).get('riders') || new List([]);

export const getAllExternalRidersBySelectedClient = state => getSelectedExternalClient(state).get('riders') || new List([]);

export const getExternalRider = (state, clientId, riderId) => {
  getAllExternalRidersByClient(state, clientId).find(rider => rider.get('id') === riderId);
};

export const getFCMToken = state => state.getIn(['app', 'fcmToken']);

export const getFirebaseInstanceId = state => state.getIn(['app', 'firebaseInstanceId']);

export const getIsFCMPermissionGranted = state => state.getIn(['app', 'fcmPermissionGranted'], false);

export const getIsRegisteredForRemoteNotifications = state => state.getIn(['app', 'registeredForRemoteNotifications'], false);

export const getPushNotifications = state => state.getIn(['app', 'notifications'], new List([]));

export const getPushServerToken = state => state.getIn(['app', 'pushServerToken']);

export const getCurrentNotificationId = state => state.getIn(['app', 'currentNotificationId']);

export const getCurrentNotification = state => getPushNotifications(state).find(notification => notification.get('id') === getCurrentNotificationId(state));
