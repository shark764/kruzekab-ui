import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import styled from 'styled-components';
import MapView, {
  PROVIDER_GOOGLE, Marker,
} from 'react-native-maps';
import { Container } from '../../../components/Form/Elements';
import pin from '../../../assets/ic_dest.png';


const MapContainer = styled(View)`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const HeaderView = styled(View)`
  position: absolute;
  flex: 1;
  top: 25px;
  margin-left: 25px;
`;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default class AddressMapPreview extends Component {
  constructor() {
    super();
    this.state = {
      mapLoaded: false,
    };
  }

  componentDidMount = () => {
    this.setState({ mapLoaded: true });
  };

  render() {
    const { mapLoaded } = this.state;
    const { navigation } = this.props;
    const { state: { params: { coords } } } = navigation;
    const { latitude, longitude } = coords;
    const screen = Dimensions.get('window');
    const ASPECT_RATIO = screen.width / screen.height;
    const latitudeDelta = 0.01;
    const longitudeDelta = latitudeDelta * ASPECT_RATIO;

    return mapLoaded && (
      <Container>
        <MapContainer>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            ref={ref => {
              this.mapRef = ref;
            }}
            style={styles.map}
            showsCompass={false}
            loadingEnabled
            region={{
              latitude,
              longitude,
              latitudeDelta,
              longitudeDelta,
            }}
          >
            <Marker
              coordinate={{
                longitude,
                latitude,
              }}
            >
              <Image source={pin} style={{ height: 40, width: 25 }} />
            </Marker>
          </MapView>
        </MapContainer>
        <HeaderView>
          <Avatar
            rounded
            size="small"
            icon={{
              name: 'ios-arrow-back', type: 'ionicon', color: '#000000', size: 18,
            }}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            overlayContainerStyle={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.39,
              shadowRadius: 8.3,
              elevation: 13,
            }}
          />
        </HeaderView>
      </Container>
    );
  }
}

AddressMapPreview.propTypes = {
};
