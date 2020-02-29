import { connect } from 'react-redux';
import Layout from './layout';
import { login } from '../../../redux/actions';

const mapStateToProps = () => ({
  initialValues: {
    phoneNumber: '',
    password: '',
  },
});

const actions = {
  login,
};

export default connect(mapStateToProps, actions)(Layout);
