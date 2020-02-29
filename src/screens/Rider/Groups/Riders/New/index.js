import { connect } from 'react-redux';
import Layout from './layout';
import { addRider } from '../../../../../redux/actions';

const mapStateToProps = () => ({
  initialValues: {
    name: '',
    photo: null,
  },
});

const actions = {
  addRider,
};

export default connect(mapStateToProps, actions)(Layout);
