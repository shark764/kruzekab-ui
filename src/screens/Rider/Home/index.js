import { connect } from 'react-redux';
import { getSelectedAddress, getLocation, getCurrentPosition } from '../../../redux/selectors';
import { updateSelectedAddress, updateCurrentPosition, updateLocation } from '../../../redux/actions';
import Layout from './layout';

const mapStateToProps = state => ({
  selectedAddress: getSelectedAddress(state),
  location: getLocation(state),
  currentPosition: getCurrentPosition(state)
});

const actions = {
  updateSelectedAddress,
  updateCurrentPosition,
  updateLocation
};

export default connect(mapStateToProps, actions)(Layout);
