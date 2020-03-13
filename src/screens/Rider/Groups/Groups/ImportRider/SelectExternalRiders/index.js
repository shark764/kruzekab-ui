import { connect } from 'react-redux';
import Layout from './layout';
import {
  getAllExternalRidersBySelectedClient,
  getSelectedExternalClientId,
  getSelectedGroupId,
} from '../../../../../../redux/selectors';
import { setExternalRiders, setGroupRiders } from '../../../../../../redux/actions';

const mapStateToProps = state => ({
  groupId: getSelectedGroupId(state),
  externalClientId: getSelectedExternalClientId(state),
  riders: getAllExternalRidersBySelectedClient(state),
});

const actions = {
  setExternalRiders,
  setGroupRiders,
};

export default connect(mapStateToProps, actions)(Layout);
