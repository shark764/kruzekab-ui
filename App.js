import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/iid';
import '@react-native-firebase/messaging';

import AppNavigator from './src/navigation';
import {
  setFCMToken,
  setInstanceId,
  setIsPermissionGranted,
  setIsRegisteredForRemoteNotifications,
} from './src/redux/actions';
import PushController from './src/components/notifications/PushController';
import Notifications from './src/components/notifications/Notifications';

console.disableYellowBox = true;

class App extends Component {
  componentDidMount() {
    this.registerAppWithFCM();
    this.requestPermission();
    this.getInstanceId();
    this.getFCMToken();

    this.messageListener = firebase.messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage);

      // Update a users messages list using AsyncStorage
      // const currentMessages = await AsyncStorage.getItem('messages');
      // const messageArray = JSON.parse(currentMessages);
      // messageArray.push(remoteMessage.data);
      // await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
    });
  }

  componentWillUnmount() {
    this.messageListener();
  }

  registerAppWithFCM = async () => {
    try {
      await firebase.messaging().registerForRemoteNotifications();
    } catch (error) {
      console.log('registerAppWithFCM ****', JSON.stringify(error, null, 2));
    }
  };

  requestPermission = async () => {
    try {
      const permissionGranted = await firebase.messaging().requestPermission();
      const { storeIsPermissionGranted } = this.props;
      storeIsPermissionGranted(permissionGranted);
    } catch (error) {
      console.log('requestPermission ****', JSON.stringify(error, null, 2));
    }
  };

  getInstanceId = async () => {
    try {
      const id = await firebase.iid().get();
      const { storeInstanceId } = this.props;
      storeInstanceId(id);
    } catch (error) {
      console.log('getInstanceId ****', JSON.stringify(error, null, 2));
    }
  };

  getFCMToken = async () => {
    try {
      const { storeFCMToken, storeIsRegisteredForRemoteNotifications } = this.props;

      const { isRegisteredForRemoteNotifications } = firebase.messaging();
      storeIsRegisteredForRemoteNotifications(isRegisteredForRemoteNotifications);

      const fcmToken = await firebase.messaging().getToken();
      storeFCMToken(fcmToken);
    } catch (error) {
      console.log('getFCMToken ****', JSON.stringify(error, null, 2));
    }
  };

  render() {
    // console.log('\nfirebase.apps.length', firebase.apps.length);

    return (
      <>
        <AppNavigator />
        <PushController />
        <Notifications />
      </>
    );
  }
}

App.propTypes = {
  storeFCMToken: PropTypes.func.isRequired,
  storeInstanceId: PropTypes.func.isRequired,
  storeIsPermissionGranted: PropTypes.func.isRequired,
  storeIsRegisteredForRemoteNotifications: PropTypes.func.isRequired,
};

const actions = {
  storeFCMToken: setFCMToken,
  storeInstanceId: setInstanceId,
  storeIsPermissionGranted: setIsPermissionGranted,
  storeIsRegisteredForRemoteNotifications: setIsRegisteredForRemoteNotifications,
};

export default connect(null, actions)(App);
