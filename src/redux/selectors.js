import { List } from 'immutable';

export const getAllRiders = state => state.getIn(['app', 'riders']);

export const getAllGroups = state => state.getIn(['app', 'groups']);

export const getAllRidersInGroup = state => state.getIn(['app', 'groups', 'riders'], new List([]));

export const getNewUserData = state => state.getIn(['app', 'newUser']);

export const getNewGroupData = state => state.getIn(['app', 'newGroup']);

export const getSelectedAddress = state => state.getIn(['app', 'selectedAddress']);

export const getLocation = state => state.getIn(['app', 'location']);

export const getCurrentPosition = state => state.getIn(['app', 'currentPosition']);
