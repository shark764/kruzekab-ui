import React, { Component } from 'react';
import { Button, Icon } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../components/Form/FormButton';
import WelcomeLogo from '../components/Logo/WelcomeLogo';
import {
  Headline,
  SubHeadline,
  ButtonContainer,
  Container,
  LogoContainer,
  BottomContainer,
} from '../components/Form/Elements';

const StyledHeadline = styled(Headline)`
  text-align: center;
  font-size: 22px;
  margin-top: 80px;
  margin-bottom: 0;
  margin-left: 0;
  color: #212226;
`;
const StyledSubHeadline = styled(SubHeadline)`
  text-align: center;
  margin-bottom: 50px;
  margin-left: 0;
  color: #a8b4cd;
`;
const StyledButtonContainer = styled(ButtonContainer)`
  margin-top: 10px;
  margin-bottom: 5px;
`;

export default class Initial extends Component {
  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  goToLogin = () => this.navigateTo('Login', { userType: null });

  goToSignup = () => this.navigateTo('Signup', { userType: 'rider' });

  goToDriverSignup = () => this.navigateTo('DriverSignup', { userType: 'driver' });

  goToForgotPassword = () => this.navigateTo('ForgotPassword', { userType: null });

  render() {
    return (
      <Container>
        <StyledHeadline>Let&apos;s Get You Started!</StyledHeadline>
        <StyledSubHeadline>Sign Up or Login to your Account</StyledSubHeadline>
        <LogoContainer>
          <WelcomeLogo />
        </LogoContainer>
        <StyledButtonContainer>
          <FormButton buttonType="outline" onPress={this.goToLogin} title="Login" buttonColor="#5280e2" />
        </StyledButtonContainer>
        <StyledButtonContainer>
          <FormButton onPress={this.goToSignup} title="Sign Up" textColor="white" />
        </StyledButtonContainer>
        <BottomContainer>
          <Button
            icon={<Icon name="drive-eta" size={25} color="#5280e2" />}
            title=" I want to become a Driver"
            onPress={this.goToDriverSignup}
            titleStyle={{
              color: '#5280e2',
              textDecorationLine: 'underline',
            }}
            type="clear"
          />
        </BottomContainer>
      </Container>
    );
  }
}
