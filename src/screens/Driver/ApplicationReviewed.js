import React, { Component, Fragment } from 'react';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Headline, SubHeadline, LogoContainer, ButtonContainer, Container } from '../../components/Form/Elements';
import { FormattedError } from '../../components/Form/ErrorMessage';
import FormButton from '../../components/Form/FormButton';
import WelcomeLogo from '../../components/Logo/WelcomeLogo';

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

// class ApplicationReviewed extends Component {
export default class ApplicationReviewed extends Component {
  state = {};

  static navigationOptions = ({}) => {
    return {
      headerTitle: () => null,
      headerLeft: () => null,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      }
    };
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: null });

  handleOnSubmit = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);

      // if (response.user.uid) {
      //   const { uid } = response.user;
      //   const userData = { email, name, uid };
      //   await this.props.firebase.createNewUser(userData);
      //   this.props.navigation.navigate('App', { userType: null });
      // }
      setTimeout(() => {
        this.props.navigation.navigate('Login', { userType: 'driver' });
        // this.props.navigation.navigate('Login', { userType: null });
      }, 1500);
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message);
    } finally {
      // TODO:
      // This is avoiding submit button loading icon
      // actions.setSubmitting(false);
    }
  };

  render() {
    console.log('Nav param', 'ApplicationReviewed', this.props.navigation.getParam('userType', null));

    return (
      <Container enabled behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Your application is being reviewed!</StyledHeadline>
          <StyledSubHeadline>We'll email you when you've been approved.</StyledSubHeadline>

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

                <ButtonContainer>
                  <FormButton
                    onPress={handleSubmit}
                    title="Done"
                    textColor="white"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </ButtonContainer>

                {errors.general && <FormattedError errorValue={errors.general} />}
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </Container>
    );
  }
}
