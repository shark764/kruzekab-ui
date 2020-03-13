import { connect } from 'react-redux';
import Layout from './layout';
import { addRider, addRiderToGroup, setGroupRiders } from '../../../../../redux/actions';
import { getSelectedGroupId } from '../../../../../redux/selectors';

const mapStateToProps = state => ({
  initialValues: {
    name: '',
    photo: null,
  },
  groupId: getSelectedGroupId(state),
});

const actions = {
  addRider,
  addRiderToGroup,
  setGroupRiders,
};

export default connect(mapStateToProps, actions)(Layout);
