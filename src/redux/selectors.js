import { List } from 'immutable';

export const getAllRiders = state => state.getIn(['app', 'riders'], new List([]));

export const getAllGroups = state => state.getIn(['app', 'groups'], new List([]));

export const getRider = (state, riderId) => state.getIn(['app', 'riders'], new List([])).find(rider => rider.get('id') === riderId);

export const getGroup = (state, groupId) => state.getIn(['app', 'groups'], new List([])).find(group => group.get('id') === groupId);

export const getAllRidersInGroup = state => state.getIn(['app', 'groups', 'riders'], new List([]));

export const getNewUserData = state => state.getIn(['app', 'newUser']);

export const getNewGroupData = state => state.getIn(['app', 'newGroup']);

export const getSelectedAddress = state => state.getIn(['app', 'selectedAddress']);

export const getLocation = state => state.getIn(['app', 'location']);

export const getCurrentPosition = state => state.getIn(['app', 'currentPosition']);

export const getNewDriver = state => state.getIn(['app', 'newUser']);

export const getNewGroup = state => state.getIn(['app', 'newGroup']);

export const getUserData = state => state.getIn(['app', 'userData']);

export const getClientData = state => state.getIn(['app', 'userData', 'client']);

export const getClientId = state => state.getIn(['app', 'userData', 'client', 'id']);

export const getDriverData = state => state.getIn(['app', 'userData', 'driver']);

export const getDriverId = state => state.getIn(['app', 'userData', 'driver', 'id']);
