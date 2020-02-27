import { connect } from 'react-redux';
import Layout from './layout';
import { addToNewUser, addNewUser } from '../../../redux/actions';

const mapStateToProps = () => ({});

const actions = {
  addToNewUser,
  addNewUser
};

export default connect(mapStateToProps, actions)(Layout);
