import { connect } from 'react-redux';
import Layout from './layout';
import { getAllGroups } from '../../../../redux/selectors';
import { addGroup } from '../../../../redux/actions';

const mapStateToProps = (state, props) => ({
  groups: getAllGroups(state)
});

const actions = {
  addGroup
};

export default connect(mapStateToProps, actions)(Layout);
