import styled from 'styled-components';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: #fff;
`;

export const Headline = styled(Text)`
  font-weight: bold;
  font-size: 30px;
  margin-top: 15px;
  margin-right: 0;
  margin-bottom: 25px;
  margin-left: 25px;
  color: #5280e2;
  font-family: Open Sans;
  font-style: normal;
  letter-spacing: 0.2px;
`;

export const SubHeadline = styled(Text)`
  font-weight: normal;
  font-size: 16px;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 25px;
  margin-left: 25px;
  color: #6b768d;
  letter-spacing: 0.2px;
`;

export const Title = styled(Text)`
  color: #333;
  font-size: 24px;
  margin-left: 25px;
`;

export const ButtonContainer = styled(View)`
  margin-top: 25px;
  margin-right: 25px;
  margin-bottom: 25px;
  margin-left: 25px;
`;

export const BottomContainer = styled(View)`
  position: absolute;
  bottom: 25px;
  align-self: center;
`;

export const HelpButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const HelpButtonText = styled(Text)`
  color: #5280e2;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
`;

export const Label = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #6b768d;
`;

export const LogoContainer = styled(HideWithKeyboard)`
  margin-bottom: 15px;
  align-items: center;
`;
