import React, { Component } from 'react';
import {
  Text, View, ScrollView, TextInput,
} from 'react-native';
import { Input, Avatar, Button } from 'react-native-elements';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Container } from '../../../components/Form/Elements';

const StyledHeadline = styled(Text)`
  width: 237px;
  height: 25px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #3e4958;
  text-align: center;
  letter-spacing: 0.2px;
`;
const TextArea = styled(TextInput)`
  background: #f7f8f9;
  border: 1px solid #a8b4cd;
  border-radius: 4px;
  color: #6b768d;
  line-height: 20px;
  font-size: 13px;
`;

const StyledText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #6b768d;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledSavingText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #5280e2;
  margin-left: 12px;
  margin-top: 5px;
`;

const inputStyle = {
  color: '#6B768D',
  fontSize: 13,
  lineHeight: 20,
};
export default class AddressDetails extends Component {
  constructor(props) {
    super(props);

    const { navigation } = props;

    this.address = (navigation.state.params.selectedAddress.address
      && navigation.state.params.selectedAddress.address.split(','))
      || (navigation.state.params.selectedAddress.formatted_address
        && navigation.state.params.selectedAddress.formatted_address.split(','))
      || (navigation.state.params.selectedAddress.vicinity
        && navigation.state.params.selectedAddress.vicinity.split(','));

    this.state = {
      selectedAddress: navigation.state.params.selectedAddress,
      name: navigation.state.params.selectedAddress.name,
      // setSelectedAddress: navigation.state.params.setSelectedAddress,
      address1: ((this.address[0] && `${this.address[0]}`) || '') + ((this.address[1] && `, ${this.address[1]}`) || ''),
      address2: ((this.address[2] && `${this.address[2]}`) || '') + ((this.address[3] && `, ${this.address[3]}`) || ''),
      saveStatus: 'Save Address',
      saveIconColor: '#5280E2',
      saveIconBackgroundColor: '#DDE5F7',
      saveIcon: 'plus',
      locationAlias: '',
    };
  }

  render() {
    const { navigation } = this.props;
    const {
      address1,
      address2,
      name,
      selectedAddress,
      notes,
      locationAlias,
      saveIcon,
      saveIconColor,
      saveIconBackgroundColor,
      saveStatus,
    } = this.state;

    return (
      <Container>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 13,
              marginLeft: 15,
            }}
          >
            <Avatar
              rounded
              size="small"
              icon={{ name: 'chevron-left', type: 'font-awesome', color: '#000000' }}
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
            <StyledHeadline>Address details</StyledHeadline>
          </View>
          <View
            style={{
              marginTop: 30,
              marginLeft: 25,
              marginRight: 25,
            }}
          >
            <Formik
              initialValues={{
                address1,
                address2,
                name,
              }}
              validate={values => {
                const errors = {};
                if (!values.address1) {
                  errors.address1 = "Address can't be blank";
                }
                return errors;
              }}
              onSubmit={values => {
                console.log(selectedAddress);
                const address = `${values.address1}, ${values.address2}, ${values.address3}`;
                const newSelectedAddress = {
                  longitude: selectedAddress.longitude || selectedAddress.geometry.location.lng,
                  latitude: selectedAddress.latitude || selectedAddress.geometry.location.lat,
                  name: values.name,
                  notes,
                  alias: locationAlias,
                  address,
                };

                navigation.navigate('SelectGroup', {
                  selectedAddress: newSelectedAddress,
                  // setSelectedAddress: this.props.navigation.state.params.setSelectedAddress
                });
              }}
            >
              {({
                handleSubmit, values, errors, handleChange,
              }) => (
                <>
                  <StyledText>Address</StyledText>
                  <Input
                    inputStyle={inputStyle}
                    value={values.name}
                    errorMessage={errors.name}
                    onChangeText={handleChange('name')}
                  />
                  <Input inputStyle={inputStyle} value={values.address1} onChangeText={handleChange('address1')} />
                  <Input inputStyle={inputStyle} value={values.address2} onChangeText={handleChange('address2')} />
                  <StyledText>Add a note</StyledText>
                  <TextArea multiline numberOfLines={4} placeholder="Your message here..." />
                  <View
                    style={{
                      marginTop: 29,
                      flex: 1,
                      flexDirection: 'row',
                    }}
                  >
                    <Avatar
                      rounded
                      size="small"
                      icon={{ name: saveIcon, type: 'font-awesome', color: saveIconColor }}
                      onPress={
                          () => this.setState({
                            saveStatus: 'Saved',
                            saveIconBackgroundColor: '#5280E2',
                            saveIconColor: '#FFFFFF',
                            saveIcon: 'check',
                          })
                        }
                      activeOpacity={0.7}
                      overlayContainerStyle={{
                        backgroundColor: saveIconBackgroundColor,
                      }}
                    />
                    <StyledSavingText>{saveStatus}</StyledSavingText>
                  </View>
                  <View style={{ marginTop: 64 }}>
                    <Button title="Continue" onPress={handleSubmit} />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
