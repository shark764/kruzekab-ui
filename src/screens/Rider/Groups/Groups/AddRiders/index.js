import { connect } from 'react-redux';
import Layout from './layout';
import { getAllRiders, getSelectedGroupId } from '../../../../../redux/selectors';
import { setRiders, setGroupRiders, addRiderToGroup } from '../../../../../redux/actions';

const mapStateToProps = state => ({
  groupId: getSelectedGroupId(state),
  riders: getAllRiders(state),
});

const actions = {
  setRiders,
  setGroupRiders,
  addRiderToGroup,
};

export default connect(mapStateToProps, actions)(Layout);
