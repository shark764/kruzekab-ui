import { connect } from 'react-redux';
import Layout from './layout';
import { getAllGroups } from '../../../../redux/selectors';
import { setGroups, setSelectedGroup, addToNewRide } from '../../../../redux/actions';

const mapStateToProps = state => ({
  groups: getAllGroups(state).toJS(),
});

const actions = {
  setGroups,
  setSelectedGroup,
  addToNewRide,
};

export default connect(mapStateToProps, actions)(Layout);
