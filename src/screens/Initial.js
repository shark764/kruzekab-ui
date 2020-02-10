import React, { Component } from 'react';
import { View } from 'react-native';
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
  BottomContainer
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
  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToSignup = () => this.props.navigation.navigate('Signup', { userType: 'rider' });

  goToDriverSignup = () => this.props.navigation.navigate('DriverSignup', { userType: 'driver' });

  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword', { userType: null });

  render() {
    console.log('Nav param', 'Initial', this.props.navigation.getParam('userType', null));

    return (
      <Container>
        <StyledHeadline>Let's Get You Started!</StyledHeadline>
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
              textDecorationLine: 'underline'
            }}
            type="clear"
          />
        </BottomContainer>
      </Container>
    );
  }
}
