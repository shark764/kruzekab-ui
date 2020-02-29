import { connect } from 'react-redux';
import Layout from './layout';
import { importRiders } from '../../../../../redux/actions';

const mapStateToProps = (state, props) => {
  const groupId = props.navigation.getParam('groupId', null);
  return {
    initialValues: {
      parentPhoneNumber: '',
    },
    groupId,
  };
};

const actions = {
  importRiders,
};

export default connect(mapStateToProps, actions)(Layout);
