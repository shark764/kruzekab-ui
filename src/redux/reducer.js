import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import axios from 'axios';

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

const driver = {
  name: 'Irvin',
  last_name: 'Sandoval',
  phone_number: '+179859475',
  password: '12345',
  user_type: '1',
  max_seats: '4',
  vehicle_year: '2010',
  license_number: '567890',
  birthdate: '08/02/1988',
  /*profile_picture,
  licence_picture,*/
  gender: 'M'
};

async function sendData(data) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC');

  const formdata = new FormData();
  /*formdata.append('name', 'Gerardo Zarate');
  formdata.append('phone_number', '+17985940004');
  formdata.append('password', '123456789');
  formdata.append('max_seats', '4');
  formdata.append('vehicle_year', '2010');
  formdata.append('license_number', '567890');
  formdata.append('birthdate', '08/02/1988');
  formdata.append('profile_picture', { uri: data.profilePicture.uri, type: data.profilePicture.type, name: 'sopa' });
  formdata.append('license_picture', { uri: data.licencePicture.uri, type: data.licencePicture.type, name: 'sopa_2' });
  formdata.append('gender', 'M');
  formdata.append('main_job_title', 'Don nadie');
  formdata.append('automaker', 'Bici');
  formdata.append('model', 'Vieja');*/

  formdata.append('name', `${data.name} ${data.lastName}`);
  formdata.append('phone_number', data.phoneNumber);
  formdata.append('password', data.password);
  formdata.append('max_seats', data.maxSeats);
  formdata.append('vehicle_year', data.vehicleYear);
  formdata.append('license_number', data.licenseNumber);
  formdata.append('birthdate', data.birthdate);
  formdata.append('profile_picture', { uri: data.profilePicture.uri, type: data.profilePicture.type, name: 'dba031e6-4c46-48aa-85f6-283ef9b4423d' });
  formdata.append('license_picture', { uri: data.licensePicture.uri, type: data.licensePicture.type, name:  'dba031e6-4c46-48aa-85f6-283ef9b4423f'});
  formdata.append('gender', data.gender === 'male' ? 'M' : 'F');
  formdata.append('main_job_title', data.occupation);
  formdata.append('automaker', data.car);
  formdata.append('model', data.model);

  try {
    const res = await axios.post('https://api.kruzekab.com/api/user/driver', formdata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '$2y$12$x5ulIrUynT/QlLZz7Xh4q.6YXYF7o2z18MVGAJCbUDnkANoyi6uJC'
      }
    });
    console.log('res on try');
    console.log(res);
  } catch (error) {
    console.log('it enters to an error');
    console.log(error);
  }
  console.log();
}

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
    case 'ADD_NEW_USER':
      const newUser = state.get('newUser').toJS();
      console.log('new user', newUser);

      sendData(newUser);

      return state;

    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer
});
