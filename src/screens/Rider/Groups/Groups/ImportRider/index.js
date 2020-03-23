import { connect } from 'react-redux';
import Layout from './layout';
import { importRiders } from '../../../../../redux/actions';
import { getSelectedGroupId } from '../../../../../redux/selectors';

const mapStateToProps = state => ({
  initialValues: {
    parentPhoneNumber: '',
  },
  groupId: getSelectedGroupId(state),
});

const actions = {
  importRiders,
};

export default connect(mapStateToProps, actions)(Layout);
