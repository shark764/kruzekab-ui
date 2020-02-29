import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components';
import {
  Headline,
  SubHeadline,
  LogoContainer,
  Container,
  BottomButtonContainer,
} from '../../../components/Form/Elements';
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
  static navigationOptions = () => ({
    headerLeft: () => null,
  });

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  render() {
    const { navigation } = this.props;
    const userType = navigation.getParam('userType', null);

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
            }}
          >
            {({ isValid, isSubmitting }) => (
              <>
                <StyledLogoContainer>
                  <WelcomeLogo />
                </StyledLogoContainer>

                <BottomButtonContainer>
                  <FormButton
                    onPress={() => this.navigateTo('Login', { userType })}
                    title="Log in"
                    textColor="white"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </BottomButtonContainer>
              </>
            )}
          </Formik>
        </ScrollView>
      </Container>
    );
  }
}
