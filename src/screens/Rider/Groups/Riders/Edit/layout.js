import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Image } from 'react-native';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import { Container } from '../../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';
import { updateRiderRequest } from '../../../../../redux/requests';

const StyledContainer = styled(Container)`
  margin-top: 130px;
`;

export default class EditRider extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit rider',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('Riders')}
        itemOnPress={() => navigation.navigate('Riders')}
      />
    ),
    headerBackground: () => (
      <Image style={{ width: '100%', height: 250 }} source={require('../../../../../assets/map.png')} />
    ),
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
      const { updateRider } = this.props;
      const { data } = await updateRiderRequest(values);
      updateRider(values.id, data.data);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);

      this.navigateTo('Riders', {});
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

  handleOnDelete = async () => {
    try {
      const { removeRider, riderId } = this.props;
      await removeRider(riderId);
      this.navigateTo('Riders');
    } catch (error) {
      // Error
    }
  };

  render() {
    const { photo } = this.state;
    const { riderId, initialValues } = this.props;

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Form
            handleOnSubmit={this.handleOnSubmit}
            riderId={riderId}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleChoosePhoto={this.handleChoosePhoto}
            photo={photo}
            handleOnDelete={this.handleOnDelete}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

EditRider.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  riderId: PropTypes.number.isRequired,
  updateRider: PropTypes.func.isRequired,
  removeRider: PropTypes.func.isRequired,
};
