import { connect } from 'react-redux';
import Layout from './layout';
import { addRider, addRiderToGroup } from '../../../../../redux/actions';
import { getSelectedGroupId } from '../../../../../redux/selectors';

const mapStateToProps = state => ({
  initialValues: {
    name: '',
    photo: null,
    groupId: getSelectedGroupId(state),
  },
});

const actions = {
  addRider,
  addRiderToGroup,
};

export default connect(mapStateToProps, actions)(Layout);
