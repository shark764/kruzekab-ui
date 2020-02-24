import { connect } from 'react-redux';
import Layout from './layout';
import { getAllGroups, getLocation } from '../../../../redux/selectors';
import { addGroup, addRiderToGroup, updateSelectedAddress } from '../../../../redux/actions';

const mapStateToProps = (state, props) => ({
  groups: getAllGroups(state),
  location: getLocation(state)
});

const actions = {
  addRiderToGroup,
  updateSelectedAddress
};

export default connect(mapStateToProps, actions)(Layout);
