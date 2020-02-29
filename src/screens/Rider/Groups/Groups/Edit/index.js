import { connect } from 'react-redux';
import Layout from './layout';
import { getGroup } from '../../../../../redux/selectors';
import { updateGroup, removeGroup } from '../../../../../redux/actions';

const mapStateToProps = (state, props) => {
  const groupId = props.navigation.getParam('groupId', null);
  return {
    initialValues: getGroup(state, groupId).toJS(),
    groupId,
  };
};

const actions = {
  updateGroup,
  removeGroup,
};

export default connect(mapStateToProps, actions)(Layout);
