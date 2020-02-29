import { connect } from 'react-redux';
import Layout from './layout';
import { getAllGroups } from '../../../../redux/selectors';

const mapStateToProps = state => ({
  groups: getAllGroups(state),
});

export default connect(mapStateToProps)(Layout);
