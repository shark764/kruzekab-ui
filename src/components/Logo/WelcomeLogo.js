import React from 'react';
import { Image } from 'react-native-elements';
import styled from 'styled-components';

const ImageLogo = styled(Image)`
  width: 237px;
  height: 250px;
  left: 62px;
  top: 177px;
`;

const Logo = require('../../assets/ini-map.png');

const WelcomeLogo = () => <ImageLogo source={Logo} />;

export default WelcomeLogo;
