import { Component } from 'react';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { addPushNotification, setPushServerToken } from '../../redux/actions';

class PushController extends Component {
  componentDidMount() {
    const self = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async token => {
        const { storePushServerToken } = self.props;
        storePushServerToken(token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: async notification => {
        console.log('NOTIFICATION:', JSON.stringify(notification, null, 2));

        switch (notification.type) {
          case '1': {
            break;
          }
          case '2': {
            break;
          }
          case '3': {
            break;
          }
          default:
            break;
        }

        const { storePushNotification } = self.props;
        storePushNotification(notification);

        // Required on iOS only (see fetchCompletionHandler docs:
        // https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only: GCM or FCM Sender ID (product_number)
      // (optional - not required for local notifications,
      // but is need to receive remote push notifications)
      senderID: '781126567082',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  render() {
    return null;
  }
}

const actions = {
  storePushNotification: addPushNotification,
  storePushServerToken: setPushServerToken,
};

export default connect(null, actions)(PushController);
