import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Form from './form';
import validationSchema from './validation';
import { Container, Headline } from '../../../components/Form/Elements';
import { GoBackButton } from '../../../components/Header/Navigator';

export default class DriverInformation extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <GoBackButton onPress={() => navigation.navigate('Confirm', { userType: 'driver' })} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      photo: null,
    };
  }

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { addToNewUser } = this.props;
      const { photo } = this.state;
      addToNewUser({ ...values, licensePicture: photo });

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);

      this.navigateTo('ProfilePhoto', { userType: 'driver' });
    } catch (error) {
      actions.setFieldError('general', error.message);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    const { initialValues } = this.props;
    const { photo } = this.state;

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Headline>Driver Information</Headline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleChoosePhoto={this.handleChoosePhoto}
            photo={photo}
          />
        </ScrollView>
      </Container>
    );
  }
}

DriverInformation.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  addToNewUser: PropTypes.func.isRequired,
};
