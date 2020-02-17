import { List } from 'immutable';

export const getAllRiders = state => state.get('riders');

export const getAllGroups = state => state.get('groups');

export const getAllRidersInGroup = state => state.getIn(['groups', 'riders'], new List([]));

export const getNewUserData = state => state.get('newUser');

export const getNewGroupData = state => state.get('newGroup');
