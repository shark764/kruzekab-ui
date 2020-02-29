import { connect } from 'react-redux';
import Layout from './layout';
import { addToNewUser } from '../../../redux/actions';

const mapStateToProps = () => ({
  initialValues: {
    userType: 2,
    name: '',
    phoneNumber: '',
    password: '',
    email: '',
    occupation: '',
  },
});

const actions = {
  addToNewUser,
};

export default connect(mapStateToProps, actions)(Layout);
