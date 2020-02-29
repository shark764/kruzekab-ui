import { connect } from 'react-redux';
import Layout from './layout';
import { addGroup, addToNewGroup } from '../../../../../redux/actions';

const mapStateToProps = () => ({
  initialValues: {
    name: '',
    riders: [],
    isDefault: false,
  },
});

const actions = {
  addGroup,
  addToNewGroup,
};

export default connect(mapStateToProps, actions)(Layout);
