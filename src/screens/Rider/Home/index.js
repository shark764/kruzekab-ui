import { connect } from 'react-redux';
import {
  getSelectedAddress,
  getLocation,
  getCurrentPosition,
  getCurrentRide,
  getSelectedGroup,
} from '../../../redux/selectors';
import { updateSelectedAddress, updateCurrentPosition, updateLocation } from '../../../redux/actions';
import Layout from './layout';

const mapStateToProps = state => ({
  selectedAddress: getSelectedAddress(state),
  location: getLocation(state),
  currentPosition: getCurrentPosition(state),
  currentRide: getCurrentRide(state),
  selectedGroup: getSelectedGroup(state),
});

const actions = {
  updateSelectedAddress,
  updateCurrentPosition,
  updateLocation,
};

export default connect(mapStateToProps, actions)(Layout);
