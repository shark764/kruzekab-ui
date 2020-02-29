import { connect } from 'react-redux';
import Layout from './layout';

const mapStateToProps = () => ({
  initialValues: {},
});

export default connect(mapStateToProps)(Layout);
