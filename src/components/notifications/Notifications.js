import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPushNotifications } from '../../redux/selectors';
import { setFCMToken } from '../../redux/actions';

class Notifications extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <></>;
  }
}

Notifications.propTypes = {
  storeFCMToken: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  notifications: getPushNotifications(state),
});

const actions = {
  storeFCMToken: setFCMToken,
};

export default connect(mapStateToProps, actions)(Notifications);
