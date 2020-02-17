export const login = (phoneNumber, password, userType) => ({
  type: 'LOGIN',
  phoneNumber,
  password,
  userType
});

export const signUp = (payload, userType) => ({
  type: 'SIGN_UP',
  userType,
  payload
});

export const addToNewUser = payload => ({
  type: 'ADD_TO_NEW_USER',
  payload
});

export const setUserData = payload => ({
  type: 'SET_USER_DATA',
  payload
});

export const addRider = payload => ({
  type: 'ADD_RIDER',
  payload
});

export const updateRider = (payload, riderId) => ({
  type: 'UPDATE_RIDER',
  payload,
  riderId
});

export const removeRider = riderId => ({
  type: 'REMOVE_RIDER',
  riderId
});

export const addGroup = payload => ({
  type: 'ADD_GROUP',
  payload
});

export const updateGroup = (payload, groupId) => ({
  type: 'UPDATE_GROUP',
  payload,
  groupId
});

export const removeGroup = groupId => ({
  type: 'REMOVE_GROUP',
  groupId
});

export const addRiderToGroup = (groupId, riderId) => ({
  type: 'ADD_RIDER_TO_GROUP',
  groupId,
  riderId
});

export const removeRiderFromGroup = (groupId, riderId) => ({
  type: 'REMOVE_RIDER_FROM_GROUP',
  groupId,
  riderId
});

export const addToNewGroup = payload => ({
  type: 'ADD_TO_NEW_GROUP',
  payload
});
