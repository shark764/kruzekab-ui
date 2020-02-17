import React, { Component, Fragment } from 'react';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components';
import {
  Headline,
  SubHeadline,
  LogoContainer,
  ButtonContainer,
  Container,
  BottomButtonContainer
} from '../../../components/Form/Elements';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import FormButton from '../../../components/Form/FormButton';
import WelcomeLogo from '../../../components/Logo/WelcomeLogo';

const StyledHeadline = styled(Headline)`
  margin-bottom: 0;
`;
const StyledSubHeadline = styled(SubHeadline)`
  margin-bottom: 50px;
`;
const StyledLogoContainer = styled(LogoContainer)`
  margin-bottom: 50px;
  margin-top: 50px;
`;

// class PasswordChanged extends Component {
export default class PasswordChanged extends Component {
  state = {};

  static navigationOptions = ({}) => {
    return {
      headerLeft: () => null
    };
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: null });

  handleOnSubmit = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);

      setTimeout(() => {
        this.props.navigation.navigate('Login', { userType: 'driver' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1500);
    }
  };

  render() {
    console.log('Nav param', 'PasswordChanged', this.props.navigation.getParam('userType', null));

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Your password was succesfully changed!</StyledHeadline>
          <StyledSubHeadline>Log in to your account</StyledSubHeadline>

          <Formik
            initialValues={{}}
            onSubmit={(values, actions) => {
              console.log('values =>', values);
              this.handleOnSubmit(values, actions);
            }}>
            {({ handleSubmit, errors, isValid, isSubmitting }) => (
              <Fragment>
                <StyledLogoContainer>
                  <WelcomeLogo />
                </StyledLogoContainer>

                <BottomButtonContainer>
                  <FormButton
                    onPress={handleSubmit}
                    title="Log in"
                    textColor="white"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </BottomButtonContainer>
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </Container>
    );
  }
}
