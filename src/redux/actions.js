export const login = (userType, token, payload) => ({
  type: 'LOGIN',
  userType,
  token,
  payload,
});

export const signUp = (payload, userType) => ({
  type: 'SIGN_UP',
  userType,
  payload,
});

export const addToNewUser = payload => ({
  type: 'ADD_TO_NEW_USER',
  payload,
});

export const setUserData = payload => ({
  type: 'SET_USER_DATA',
  payload,
});

export const fetchRiders = () => ({
  type: 'FETCH_RIDERS',
});

export const fetchRider = () => ({
  type: 'FETCH_RIDER',
});

export const setRiders = payload => ({
  type: 'SET_RIDERS',
  payload,
});

export const setRider = payload => ({
  type: 'SET_RIDER',
  payload,
});

export const setSelectedRider = riderId => ({
  type: 'SET_SELECTED_RIDER',
  riderId,
});

export const addRider = payload => ({
  type: 'ADD_RIDER',
  payload,
});

export const updateRider = (riderId, payload) => ({
  type: 'UPDATE_RIDER',
  riderId,
  payload,
});

export const removeRider = riderId => ({
  type: 'REMOVE_RIDER',
  riderId,
});

export const fetchGroups = () => ({
  type: 'FETCH_GROUPS',
});

export const fetchGroup = () => ({
  type: 'FETCH_GROUP',
});

export const setGroups = payload => ({
  type: 'SET_GROUPS',
  payload,
});

export const setGroup = payload => ({
  type: 'SET_GROUP',
  payload,
});

export const setSelectedGroup = groupId => ({
  type: 'SET_SELECTED_GROUP',
  groupId,
});

export const addGroup = payload => ({
  type: 'ADD_GROUP',
  payload,
});

export const updateGroup = (groupId, payload) => ({
  type: 'UPDATE_GROUP',
  groupId,
  payload,
});

export const removeGroup = groupId => ({
  type: 'REMOVE_GROUP',
  groupId,
});

export const setGroupRiders = (groupId, payload) => ({
  type: 'SET_GROUP_RIDERS',
  groupId,
  payload,
});

export const addRiderToGroup = (groupId, payload) => ({
  type: 'ADD_RIDER_TO_GROUP',
  groupId,
  payload,
});

export const removeRiderFromGroup = (groupId, riderId) => ({
  type: 'REMOVE_RIDER_FROM_GROUP',
  groupId,
  riderId,
});

export const updateGroupRider = (groupId, riderId, payload) => ({
  type: 'UPDATE_GROUP_RIDER',
  groupId,
  riderId,
  payload,
});

export const importRiders = (groupId, phoneNumber) => ({
  type: 'IMPORT_RIDERS',
  groupId,
  phoneNumber,
});

export const addToNewGroup = payload => ({
  type: 'ADD_TO_NEW_GROUP',
  payload,
});

export const updateSelectedAddress = (location, payload) => ({
  type: 'UPDATE_SELECTED_ADDRESS',
  location,
  payload,
});

export const updateLocation = location => ({
  type: 'UPDATE_LOCATION',
  location,
});

export const updateCurrentPosition = currentPosition => ({
  type: 'UPDATE_CURRENT_POSITION',
  currentPosition,
});

export const setExternalClients = payload => ({
  type: 'SET_EXTERNAL_CLIENTS',
  payload,
});

export const setSelectedExternalClient = clientId => ({
  type: 'SET_SELECTED_EXTERNAL_CLIENT',
  clientId,
});

export const setExternalRiders = (clientId, payload) => ({
  type: 'SET_EXTERNAL_RIDERS',
  clientId,
  payload,
});

export const setFCMToken = fcmToken => ({
  type: 'SET_FCM_TOKEN',
  fcmToken,
});

export const setInstanceId = iid => ({
  type: 'SET_INSTANCE_ID',
  iid,
});

export const setIsPermissionGranted = permissionGranted => ({
  type: 'SET_IS_PERMISSION_GRANTED',
  permissionGranted,
});

export const setIsRegisteredForRemoteNotifications = isRegisteredForRemoteNotifications => ({
  type: 'SET_IS_REGISTERED_FOR_REMOTE_NOTIFICATIONS',
  isRegisteredForRemoteNotifications,
});

export const addPushNotification = payload => ({
  type: 'ADD_PUSH_NOTIFICATION',
  payload,
});

export const setPushServerToken = pushServerToken => ({
  type: 'SET_PUSH_SERVER_TOKEN',
  pushServerToken,
});

export const setCurrentNotification = currentNotificationId => ({
  type: 'SET_CURRENT_NOTIFICATION',
  currentNotificationId,
});

export const addToNewRide = payload => ({
  type: 'ADD_TO_NEW_RIDE',
  payload,
});

export const addRide = payload => ({
  type: 'ADD_RIDE',
  payload,
});

export const setCurrentRide = rideId => ({
  type: 'SET_CURRENT_RIDE',
  rideId,
});
