import { connect } from 'react-redux';
import Layout from './layout';
import { getAllRiders } from '../../../../redux/selectors';
import { addRider, updateRider, removeRider } from '../../../../redux/actions';

const mapStateToProps = (state, props) => ({
  riders: getAllRiders(state)
});

const actions = {
  addRider,
  updateRider,
  removeRider
};

export default connect(mapStateToProps, actions)(Layout);
