import { connect } from 'react-redux';
import Layout from './layout';
import { addToNewUser } from '../../../redux/actions';

const mapStateToProps = () => ({
  initialValues: {
    car: '',
    model: '',
    vehicleYear: `${new Date().getFullYear()}`,
    maxSeats: '4',
    carInsurancePicture: null,
  },
});

const actions = {
  addToNewUser,
};

export default connect(mapStateToProps, actions)(Layout);
