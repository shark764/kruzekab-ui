import { connect } from 'react-redux';
import Layout from './layout';

const mapStateToProps = (state, props) => {
  const phoneNumber = props.navigation.getParam('phoneNumber', null);
  return {
    initialValues: {},
    phoneNumber,
  };
};

export default connect(mapStateToProps)(Layout);
