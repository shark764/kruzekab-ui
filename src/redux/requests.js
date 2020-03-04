import Axios from 'axios';
import { sha1 } from 'react-native-sha1';
import store from './store';
import {
  getClientId, getNewUserData, getNewGroupData, getSelectedGroupId, getSelectedRiderId,
} from './selectors';
import { keysToCamel } from '../utils/string';

const environment = 'https://api.kruzekab.com/api';

export const getEnvironment = () => environment;

export const fetchRiders = async () => {
  const clientId = getClientId(store.getState());
  const { data } = await Axios.get(`${environment}/client/${clientId}/rider`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {},
  });
  console.log('DATA || =>', keysToCamel(data));

  return keysToCamel(data);
};

export const fetchGroups = async () => {
  const clientId = getClientId(store.getState());
  const { data } = await Axios.get(`${environment}/client/${clientId}/groups`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {},
  });
  console.log('DATA || =>', keysToCamel(data));

  return keysToCamel(data);
};

export const fetchGroup = async groupId => {
  const clientId = getClientId(store.getState());
  const { data } = await Axios.get(`${environment}/client/${clientId}/group/${groupId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {},
  });
  console.log('DATA || =>', keysToCamel(data));

  return keysToCamel(data);
};

export const createDriver = async () => {
  const newUser = getNewUserData(store.getState()).toJS();

  const formdata = new FormData();

  formdata.append('name', newUser.name);
  formdata.append('user_type', '1');
  formdata.append('phone_number', newUser.phoneNumber);
  formdata.append('password', newUser.password);
  formdata.append('max_seats', newUser.maxSeats);
  formdata.append('vehicle_year', newUser.vehicleYear);
  formdata.append('license_number', newUser.licenseNumber);
  formdata.append('birthdate', newUser.birthdate);
  formdata.append('profile_picture', {
    uri: newUser.profilePicture.uri,
    type: newUser.profilePicture.type,
    name: newUser.profilePicture.fileName,
  });
  formdata.append('license_picture', {
    uri: newUser.licensePicture.uri,
    type: newUser.licensePicture.type,
    name: newUser.licensePicture.fileName,
  });
  formdata.append('car_insurance', {
    uri: newUser.carInsurancePicture.uri,
    type: newUser.carInsurancePicture.type,
    name: newUser.carInsurancePicture.fileName,
  });
  formdata.append('gender', newUser.gender === 'male' ? 'M' : 'F');
  formdata.append('main_job_title', newUser.occupation);
  formdata.append('automaker', newUser.car);
  formdata.append('model', newUser.model);
  formdata.append('background_check_approved', newUser.check ? '1' : '0');

  try {
    const { data, status } = await Axios.post(`${environment}/user/driver`, formdata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC',
      },
    });

    return { data: keysToCamel(data), status };
  } catch (error) {
    const {
      data: {
        data: { result },
      },
      status,
    } = error.response;

    const errorResponse = { code: status, message: result };
    throw errorResponse;
  }
};

export const loginRequest = async (phoneNumber, password) => {
  const hash = await sha1(`${phoneNumber}:${password}`);

  try {
    const { data, status } = await Axios.post(
      `${environment}/login`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${hash}`,
        },
      },
    );

    return { data: keysToCamel(data), status };
  } catch (error) {
    const {
      data: {
        data: { result },
      },
      status,
    } = error.response;

    const errorResponse = { code: status, message: result };
    throw errorResponse;
  }
};

export const createClient = async () => {
  const newUser = getNewUserData(store.getState()).toJS();

  try {
    const { data, status } = await Axios.post(
      `${environment}/user/client`,
      {
        name: newUser.name,
        phone_number: newUser.phoneNumber,
        password: newUser.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC',
        },
      },
    );

    return { data: keysToCamel(data), status };
  } catch (error) {
    const {
      data: {
        data: { result },
      },
      status,
    } = error.response;

    const errorResponse = { code: status, message: result };
    throw errorResponse;
  }
};

export const createRider = async ({ name, profilePicture }) => {
  const clientId = getClientId(store.getState());

  const formdata = new FormData();

  formdata.append('name', name);
  formdata.append('profile_picture', {
    uri: profilePicture.uri,
    type: profilePicture.type,
    name: profilePicture.fileName,
  });

  try {
    const { data, status } = await Axios.post(`${environment}/client/${clientId}/rider`, formdata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC',
      },
    });

    return { data: keysToCamel(data), status };
  } catch (error) {
    const {
      data: {
        data: { result },
      },
      status,
    } = error.response;

    const errorResponse = { code: status, message: result };
    throw errorResponse;
  }
};

export const updateRiderRequest = async ({ name, profilePicture }) => {
  const clientId = getClientId(store.getState());
  const riderId = getSelectedRiderId(store.getState());

  const formdata = new FormData();

  formdata.append('name', name);
  formdata.append('profile_picture', {
    uri: profilePicture.uri,
    type: profilePicture.type,
    name: profilePicture.fileName,
  });

  try {
    const { data, status } = await Axios.post(`${environment}/client/${clientId}/rider/${riderId}`, formdata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC',
      },
    });

    return { data: keysToCamel(data), status };
  } catch (error) {
    const {
      data: {
        data: { result },
      },
      status,
    } = error.response;

    const errorResponse = { code: status, message: result };
    throw errorResponse;
  }
};

export const createGroup = async ({ name }) => {
  const clientId = getClientId(store.getState());
  // const newGroup = getNewGroupData(store.getState()).toJS();

  try {
    const { data, status } = await Axios.post(
      `${environment}/client/${clientId}/group`,
      {
        name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC',
        },
      },
    );

    return { data: keysToCamel(data), status };
  } catch (error) {
    const {
      data: {
        data: { result },
      },
      status,
    } = error.response;

    const errorResponse = { code: status, message: result };
    throw errorResponse;
  }
};

export const updateGroupRequest = async ({ name }) => {
  const clientId = getClientId(store.getState());
  const groupId = getSelectedGroupId(store.getState());

  try {
    const { data, status } = await Axios.post(
      `${environment}/client/${clientId}/group/${groupId}`,
      {
        name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC',
        },
      },
    );

    return { data: keysToCamel(data), status };
  } catch (error) {
    const {
      data: {
        data: { result },
      },
      status,
    } = error.response;

    const errorResponse = { code: status, message: result };
    throw errorResponse;
  }
};

export const addRiderToGroupRequest = async (groupId, riderId) => {
  const clientId = getClientId(store.getState());
  // const newGroup = getNewGroupData(store.getState()).toJS();

  try {
    const { data, status } = await Axios.post(
      `${environment}/client/${clientId}/group/${groupId}/rider/${riderId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC',
        },
      },
    );

    return { data: keysToCamel(data), status };
  } catch (error) {
    const {
      data: {
        data: { result },
      },
      status,
    } = error.response;

    const errorResponse = { code: status, message: result };
    throw errorResponse;
  }
};
