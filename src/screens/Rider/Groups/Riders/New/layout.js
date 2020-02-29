import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Image } from 'react-native';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import { Container, Headline } from '../../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';
import { createRider } from '../../../../../redux/requests';

const StyledContainer = styled(Container)`
  margin-top: 130px;
`;
const StyledHeadline = styled(Headline)`
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.2px;
  color: #212226;
  margin-bottom: 10px;
`;

export default class NewRider extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create a new rider',
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
      const { addRider } = this.props;
      const { photo } = this.state;
      const { data } = await createRider({ ...values, profilePicture: photo });
      addRider(data.data);

      this.navigateTo('Riders', {});
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1500);
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
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>General</StyledHeadline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleChoosePhoto={this.handleChoosePhoto}
            photo={photo}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

NewRider.propTypes = {
  initialValues: PropTypes.shape.isRequired,
  addRider: PropTypes.func.isRequired,
};
