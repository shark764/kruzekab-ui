import { connect } from 'react-redux';
import Layout from './layout';
import { getAllGroups } from '../../../../redux/selectors';
import { setGroups, setSelectedGroup } from '../../../../redux/actions';

const mapStateToProps = state => ({
  groups: getAllGroups(state),
});

const actions = {
  setGroups,
  setSelectedGroup,
};

export default connect(mapStateToProps, actions)(Layout);
