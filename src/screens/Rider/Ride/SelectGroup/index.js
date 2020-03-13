import { connect } from 'react-redux';
import Layout from './layout';
import { getAllGroups } from '../../../../redux/selectors';
import { addGroup, setGroups, setSelectedGroup } from '../../../../redux/actions';

const mapStateToProps = state => ({
  groups: getAllGroups(state).toJS(),
});

const actions = {
  addGroup,
  setGroups,
  setSelectedGroup,
};

export default connect(mapStateToProps, actions)(Layout);
