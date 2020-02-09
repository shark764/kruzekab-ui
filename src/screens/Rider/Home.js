import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';
import { Container } from '../../components/Form/Elements';
import FormButton from '../../components/Form/FormButton';

const StyledContainer = styled(Container)`
  align-items: center;
  justify-content: flex-end;
`;
const ImageContainer = styled(View)`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const StyledImage = styled(Image)`
  flex: 1;
  width: null;
  height: null;
`;

export default class Home extends Component {
  handleSignout = async () => {
    try {
      // await this.props.firebase.signOut();
      setTimeout(() => {
        this.props.navigation.navigate('Initial', { userType: null });
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    console.log('Nav param', 'Home', this.props.navigation.getParam('userType', null));

    return (
      <StyledContainer>
        <ImageContainer>
          <StyledImage source={require('../../assets/google-maps_preview.png')} />
        </ImageContainer>
        <View>
          <FormButton onPress={this.handleSignout} title="Sign out" textColor="white" />
        </View>
      </StyledContainer>
    );
  }
}
