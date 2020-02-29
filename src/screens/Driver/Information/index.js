import { connect } from 'react-redux';
import Layout from './layout';
import { addToNewUser } from '../../../redux/actions';

const mapStateToProps = () => ({
  initialValues: {
    gender: 'male',
    birthdate: '',
    licenseNumber: '',
    licensePicture: null,
    trafficViolation: 'no',
    check: false,
  },
});

const actions = {
  addToNewUser,
};

export default connect(mapStateToProps, actions)(Layout);
