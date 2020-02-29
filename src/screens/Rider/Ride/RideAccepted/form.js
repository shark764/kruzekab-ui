import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import { Avatar, Icon, Badge } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../../components/Form/FormButton';
import { FormattedError } from '../../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomButtonContainer } from '../../../../components/Form/Elements';
import FormInput from '../../../../components/Form/Fields/FormInput';

const IconContainer = styled(ButtonContainer)`
  margin-bottom: 5px;
  margin-top: 120px;
  flex-direction: row;
`;

const PhotoAvatar = props => (
  <Avatar
    rounded
    showEditButton={false}
    icon={{
      name: 'md-person',
      type: 'ionicon',
      color: '#5280e2',
    }}
    overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
    activeOpacity={0.7}
    size={60}
    {...props}
  />
);

const Form = ({ handleOnSubmit, initialValues, validationSchema }) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}
  >
    {({
      handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur,
    }) => (
      <>
        <View style={{ flexDirection: 'column' }}>
          <IconContainer>
            <PhotoAvatar source={require('../../../../assets/driver-photo.png')} />
            <View style={{}}>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>Patrick L.</Text>
              <Icon style={{ marginLeft: 5 }} name="ios-star" type="ionicon" color="#4cca8d" />
            </View>
          </IconContainer>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginLeft: 25,
              marginTop: 15,
              fontSize: 20,
            }}
          >
            <Badge
              value="HS785K"
              badgeStyle={{
                color: '#212226',
                backgroundColor: '#a8b4cd',
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              textStyle={{ fontSize: 18 }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginLeft: 25,
              marginTop: 5,
              fontSize: 20,
              color: '#3e4958',
            }}
          >
            <Text>Volkswagen Jetta</Text>
          </View>
        </View>

        <View style={{ marginTop: 35 }}>
          <FormInput
            name="name"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            placeholder="Send message..."
            autoCapitalize="none"
            touched={touched}
            errors={errors}
          />
        </View>

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Cancel ride"
            textColor="white"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
        </BottomButtonContainer>
      </>
    )}
  </Formik>
);

Form.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape.isRequired,
  validationSchema: PropTypes.shape.isRequired,
};

export default Form;
