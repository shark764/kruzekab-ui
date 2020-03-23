import { connect } from 'react-redux';
import Layout from './layout';
import { getLocation, getAllRidersBySelectedGroup } from '../../../../redux/selectors';
import { addRiderToGroup, updateSelectedAddress } from '../../../../redux/actions';

const mapStateToProps = state => ({
  riders: getAllRidersBySelectedGroup(state),
  location: getLocation(state),
});

const actions = {
  addRiderToGroup,
  updateSelectedAddress,
};

export default connect(mapStateToProps, actions)(Layout);
