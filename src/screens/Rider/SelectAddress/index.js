import { connect } from 'react-redux';
import { getCurrentPosition } from '../../../redux/selectors';
import { addToNewRide } from '../../../redux/actions';
import Layout from './layout';

const mapStateToProps = state => ({
  currentPosition: getCurrentPosition(state),
});

const actions = {
  addToNewRide,
};

export default connect(mapStateToProps, actions)(Layout);
