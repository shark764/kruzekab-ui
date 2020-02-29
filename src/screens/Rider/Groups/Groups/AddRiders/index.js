import { connect } from 'react-redux';
import Layout from './layout';
import { getAllRiders, getGroup } from '../../../../../redux/selectors';
import { addRiderToGroup } from '../../../../../redux/actions';

const mapStateToProps = (state, props) => {
  const groupId = props.navigation.getParam('groupId', null);
  return {
    group: getGroup(state, groupId),
    groupId,
    riders: getAllRiders(state),
  };
};

const actions = {
  addRiderToGroup,
};

export default connect(mapStateToProps, actions)(Layout);
