import React from 'react';
import { Image } from 'react-native-elements';
import styled from 'styled-components';

const ImageLogo = styled(Image)`
  width: 200px;
  height: 200px;
`;

const Logo = require('../../assets/flame.png');

const AppLogo = () => <ImageLogo source={Logo} />;

export default AppLogo;
