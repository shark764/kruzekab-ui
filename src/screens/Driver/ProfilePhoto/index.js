import { connect } from 'react-redux';
import Layout from './layout';
import { addToNewUser } from '../../../redux/actions';

const mapStateToProps = () => ({
  initialValues: {
    profilePicture: null,
  },
});

const actions = {
  addToNewUser,
};

export default connect(mapStateToProps, actions)(Layout);
