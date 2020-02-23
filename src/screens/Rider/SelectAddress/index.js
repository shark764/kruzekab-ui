import { connect } from 'react-redux';
import { getCurrentPosition } from '../../../redux/selectors';
import { updateSelectedAddress } from '../../../redux/actions';
import Layout from './layout';

const mapStateToProps = state => ({
  currentPosition: getCurrentPosition(state)
});

const actions = {};

export default connect(mapStateToProps, actions)(Layout);
