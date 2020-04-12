import { connect } from 'react-redux';
import Layout from './layout';
import { getLocation, getSelectedGroup, getSelectedGroupId } from '../../../../redux/selectors';
import {
  setGroupRiders,
  addToNewRide,
  addRide,
  setCurrentRide,
  updateSelectedAddress,
} from '../../../../redux/actions';

const mapStateToProps = state => ({
  selectedGroup: getSelectedGroup(state),
  groupId: getSelectedGroupId(state),
  location: getLocation(state),
});

const actions = {
  setGroupRiders,
  addToNewRide,
  addRide,
  setCurrentRide,
  updateSelectedAddress,
};

export default connect(mapStateToProps, actions)(Layout);
