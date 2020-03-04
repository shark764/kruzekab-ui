import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import { Container } from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';

const StyledContainer = styled(Container)`
  margin-top: 130px;
`;

export default class RideFinished extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Arrived',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('Riders')}
        itemOnPress={() => navigation.navigate('Riders')}
      />
    ),
    headerBackground: () => (
      <Image style={{ width: '100%', height: 250 }} source={require('../../../../assets/map.png')} />
    ),
  });

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      setTimeout(() => {
        const { navigation } = this.props;

        // This is avoiding submit button loading icon
        actions.setSubmitting(false);

        navigation.navigate('Streaming', { userType: 'rider' });
      }, 1500);
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
    const { photo } = this.state;

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              userType: 2,
              name: '',
            }}
            validationSchema={validationSchema}
            handleChoosePhoto={this.handleChoosePhoto}
            photo={photo}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}
