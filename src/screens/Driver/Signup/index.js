import { connect } from 'react-redux';
import { addToNewUser } from '../../../redux/actions';
import Layout from './layout';

const mapStateToProps = () => ({});

const actions = {
  addToNewUser
};

export default connect(mapStateToProps, actions)(Layout);
