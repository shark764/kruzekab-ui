import { connect } from 'react-redux';
import Layout from './layout';
import { getAllRiders } from '../../../../redux/selectors';
import { setRiders } from '../../../../redux/actions';

const mapStateToProps = state => ({
  riders: getAllRiders(state),
});

const actions = {
  setRiders,
};

export default connect(mapStateToProps, actions)(Layout);
