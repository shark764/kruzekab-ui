import { connect } from 'react-redux';
import Layout from './layout';
import { getAllGroups } from '../../../../redux/selectors';
import { addGroup, updateGroup, removeGroup } from '../../../../redux/actions';

const mapStateToProps = (state, props) => ({
  groups: getAllGroups(state)
});

const actions = {
  addGroup,
  updateGroup,
  removeGroup
};

export default connect(mapStateToProps, actions)(Layout);
