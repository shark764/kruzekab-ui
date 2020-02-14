import React, { Component, Fragment } from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Input, Avatar, Button } from 'react-native-elements';
import { Container } from '../../components/Form/Elements';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const StyledHeadline = styled(Text)`
  width: 237px;
    height: 25px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    color: #3E4958;
    text-align: center;
    letter-spacing: 0.2px;
`;
const TextArea = styled(TextInput)`
    background: #F7F8F9;
    border: 1px solid #A8B4CD;
    border-radius: 4px;
    color: #6B768D;
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
    color: #6B768D;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const StyledSavingText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #5280E2;
  margin-left: 12px;
  margin-top: 5px;
`;

const inputStyle = {
  color: '#6B768D',
  fontSize: 13,
  lineHeight: 20
}
export default class AddressDetails extends Component {
  address = this.props.navigation.state.params.selectedAddress.formatted_address &&
    this.props.navigation.state.params.selectedAddress.formatted_address.split(',') ||
    this.props.navigation.state.params.selectedAddress.vicinity.split(',');
  state = {
    selectedAddress: this.props.navigation.state.params.selectedAddress,
    setSelectedAddress: this.props.navigation.state.params.setSelectedAddress,
    address1: (this.address[0] && `${this.address[0]}` || '') + (this.address[1] && `, ${this.address[1]}` || ''),
    address2: (this.address[2] && `${this.address[2]}` || '') + (this.address[3] && `, ${this.address[3]}` || ''),
    address3: '',
    saveStatus: 'Save Address',
    saveIconColor: '#5280E2',
    saveIconBackgroundColor: '#DDE5F7',
    saveIcon: 'plus',
  };

  render = () => (
    <Container>
      <ScrollView>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 13,
          marginLeft: 15,
        }}>
          <Avatar
            rounded
            size='small'
            icon={{ name: 'chevron-left', type: 'font-awesome', color: '#000000' }}
            onPress={() => this.props.navigation.goBack()}
            activeOpacity={0.7}
            overlayContainerStyle={{
              backgroundColor: '#FFFFFF',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.39,
              shadowRadius: 8.30,
              elevation: 13,
            }}
          />
          <StyledHeadline>Address details</StyledHeadline>
        </View>
        <View style={{
          marginTop: 30,
          marginLeft: 25,
          marginRight: 25,
        }}>
          <Formik
            initialValues={{
              address1: this.state.address1,
              address2: this.state.address2,
              address3: this.state.address3
            }}
            validate={values => {
              const errors = {};
              if (!values.address1) errors.address1 = "Address can't be blank";
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              this
                .state
                .selectedAddress
                .formatted_address = `${values.address1}, ${values.address2}, ${values.address3}`;
              this.state.setSelectedAddress(this.state.selectedAddress);
              this.props.navigation.navigate('Home', {})
            }}
          >
            {({ handleSubmit, values, errors, handleChange }) => (
              <Fragment>
                <StyledText>Address</StyledText>
                <Input inputStyle={inputStyle}
                  value={values.address1}
                  errorMessage={errors.address1}
                  onChangeText={handleChange('address1')}
                />
                <Input inputStyle={inputStyle}
                  value={values.address2}
                  onChangeText={handleChange('address2')}
                />
                <Input inputStyle={inputStyle}
                  value={values.address3}
                  onChangeText={handleChange('address3')}
                />
                <StyledText>Add a note</StyledText>
                <TextArea
                  multiline={true}
                  numberOfLines={4}
                  placeholder='Your message here...' />
                <View style={{
                  marginTop: 29,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                  <Avatar
                    rounded
                    size='small'
                    icon={{ name: this.state.saveIcon, type: 'font-awesome', color: this.state.saveIconColor }}
                    onPress={() => this.setState({
                      saveStatus: 'Saved', saveIconBackgroundColor: '#5280E2', saveIconColor: '#FFFFFF', saveIcon: 'check'
                    })}
                    activeOpacity={0.7}
                    overlayContainerStyle={{
                      backgroundColor: this.state.saveIconBackgroundColor,
                    }}
                  />
                  <StyledSavingText>{this.state.saveStatus}</StyledSavingText>
                </View>
                <View
                  style={{ marginTop: 64 }}>
                  <Button title='Continue' onPress={handleSubmit} />
                </View>
              </Fragment>
            )}
          </Formik>

        </View>
      </ScrollView>
    </Container>
  );
}