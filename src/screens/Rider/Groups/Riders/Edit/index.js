import { connect } from 'react-redux';
import Layout from './layout';
import { getRider } from '../../../../../redux/selectors';
import { updateRider, removeRider } from '../../../../../redux/actions';

const mapStateToProps = (state, props) => {
  const riderId = props.navigation.getParam('riderId', null);
  return {
    initialValues: getRider(state, riderId).toJS(),
    riderId,
  };
};

const actions = {
  updateRider,
  removeRider,
};

export default connect(mapStateToProps, actions)(Layout);
