import { connect } from 'react-redux';
import Layout from './layout';
import { getAllGroups } from '../../../../redux/selectors';
import { addGroup, addRiderToGroup } from '../../../../redux/actions';

const mapStateToProps = (state, props) => ({
  groups: getAllGroups(state)
});

const actions = {
  addRiderToGroup
};

export default connect(mapStateToProps, actions)(Layout);
