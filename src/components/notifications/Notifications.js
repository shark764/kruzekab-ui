import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import {
  // getPushNotifications,
  getCurrentNotification,
} from '../../redux/selectors';
import { changeAccessRequestStatus } from '../../redux/requests';
import { setCurrentNotification } from '../../redux/actions';

class Notifications extends Component {
  handleAccessRequest = async (accessRequestId, value) => {
    await changeAccessRequestStatus(accessRequestId, value);
    this.handleCloseDialog();
  };

  handleCloseDialog = () => {
    const { storeCurrentNotification } = this.props;
    storeCurrentNotification('');
  };

  render() {
    const { notification } = this.props;
    if (!notification) {
      return null;
    }

    switch (notification.get('type')) {
      case '1': {
        return (
          <ConfirmDialog
            title={notification.get('title')}
            message={notification.get('message')}
            visible
            animationType="fade"
            contentStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onTouchOutside={() => this.handleCloseDialog()}
            positiveButton={{
              title: 'Share',
              onPress: () => this.handleAccessRequest(notification.get('accessRequestId'), 1),
              titleStyle: {
                color: '#5280E2',
                colorDisabled: 'gray',
              },
            }}
            negativeButton={{
              title: 'Decline',
              onPress: () => this.handleAccessRequest(notification.get('accessRequestId'), 0),
              titleStyle: {
                color: '#EB001B',
                colorDisabled: 'gray',
              },
            }}
          />
        );
      }
      case '2':
      case '3': {
        return (
          <Dialog
            title={notification.get('title')}
            visible
            animationType="fade"
            contentStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onTouchOutside={() => this.handleCloseDialog()}
          >
            <Text style={{ marginVertical: 30 }}>{notification.get('message')}</Text>
            <Button
              onPress={() => this.handleCloseDialog()}
              style={{ marginTop: 10 }}
              title="Close"
              icon={{
                type: 'ionicon',
                name: 'ios-close-circle',
                size: 15,
                color: 'white',
              }}
            />
          </Dialog>
        );
      }
      default:
        return null;
    }
  }
}

Notifications.propTypes = {
  notification: PropTypes.shape({
    toJS: PropTypes.func,
    getIn: PropTypes.func,
    get: PropTypes.func,
  }).isRequired,
  // notifications: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     type: PropTypes.string,
  //     id: PropTypes.string,
  //   }),
  // ).isRequired,
  storeCurrentNotification: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // notifications: getPushNotifications(state),
  notification: getCurrentNotification(state),
});

const actions = {
  storeCurrentNotification: setCurrentNotification,
};

export default connect(mapStateToProps, actions)(Notifications);
