import { connect } from 'react-redux';
import Layout from './layout';
import { addRider, updateRider, removeRider } from '../../../../redux/actions';

const mapStateToProps = () => ({});

const actions = {
  addRider,
  updateRider,
  removeRider
};

export default connect(mapStateToProps, actions)(Layout);
