import { connect } from 'react-redux';
import Layout from './layout';
import { getSelectedGroup, getSelectedGroupId } from '../../../../../redux/selectors';
import { updateGroup, removeGroup, setGroupRiders } from '../../../../../redux/actions';

const mapStateToProps = state => ({
  initialValues: getSelectedGroup(state).toJS(),
  groupId: getSelectedGroupId(state),
});

const actions = {
  updateGroup,
  removeGroup,
  setGroupRiders,
};

export default connect(mapStateToProps, actions)(Layout);
