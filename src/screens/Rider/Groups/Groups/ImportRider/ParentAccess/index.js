import { connect } from 'react-redux';
import Layout from './layout';
import { getAllExternalClients, getSelectedGroupId } from '../../../../../../redux/selectors';
import { setExternalClients, setSelectedExternalClient } from '../../../../../../redux/actions';

const mapStateToProps = state => ({
  groupId: getSelectedGroupId(state),
  externalClients: getAllExternalClients(state),
});

const actions = {
  setExternalClients,
  setSelectedExternalClient,
};

export default connect(mapStateToProps, actions)(Layout);
