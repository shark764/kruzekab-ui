import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon, Avatar, CheckBox } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../../../components/Form/FormButton';
import ErrorMessage, { FormattedError } from '../../../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomContainer, Headline } from '../../../../../components/Form/Elements';
import FormInput from '../../../../../components/Form/Fields/FormInput';
import FormCheckbox from '../../../../../components/Form/Fields/FormCheckbox';

const StyledHeadline = styled(Headline)`
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.2px;
  color: #212226;
  margin-bottom: 10px;
`;
const IconContainer = styled(ButtonContainer)`
  margin-top: -6px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
`;
const RiderContainer = styled(IconContainer)`
  margin-top: 0;
  margin-left: 25px;
  margin-bottom: 15px;
`;
const LabelText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #6b768d;
  justify-content: center;
  align-items: center;
`;
const DeleteLabelText = styled(Text)`
  color: #ee0000;
`;
const StyledBottomContainer = styled(BottomContainer)`
  left: 0;
  right: 0;
  margin-left: 25px;
  margin-right: 25px;
`;
const DeleteContainer = styled(View)`
  margin-left: 25px;
  flex-direction: row;
  justify-content: flex-start;
`;
const FieldContainer = styled(View)`
  margin-right: 15px;
  margin-left: 15px;
`;

const Form = ({ handleOnSubmit, initialValues, validationSchema, handleOnDelete }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, setFieldValue }) => (
      <Fragment>
        <FormInput
          name="name"
          label="Group Name"
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          placeholder="name..."
          autoCapitalize="none"
          iconName="md-person"
          iconColor="#2C384A"
          touched={touched}
          errors={errors}
        />

        <FieldContainer>
          <CheckBox
            name="isDefault"
            title="Default group"
            checkedIcon="check-circle"
            uncheckedIcon="circle-o"
            checkedColor="#5280e2"
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0 }}
            textStyle={{
              fontSize: 13,
              fontStyle: 'normal',
              fontFamily: 'Open Sans',
              fontWeight: 'normal',
              color: '#6b768d'
            }}
            checked={values.isDefault}
            onPress={() => setFieldValue('isDefault', !values.isDefault)}
          />
          <ErrorMessage name="isDefault" touched={touched} errors={errors} />
        </FieldContainer>

        <StyledHeadline>Riders</StyledHeadline>

        {values.riders.map((riderItem, index) => (
          <RiderContainer key={index}>
            <Avatar
              rounded
              // source={{
              //   uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
              // }}
              source={riderItem.imgPath}
              showEditButton={false}
              icon={{
                name: 'md-person',
                type: 'ionicon',
                color: '#5280e2'
              }}
              overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
              activeOpacity={0.7}
              size={53}
              onPress={() => this._navigateTo('EditRider', { userType: 'rider', rider: riderItem })}
              disabled={false}
            />
            <LabelText>{`  ${riderItem.name}`}</LabelText>
          </RiderContainer>
        ))}

        <IconContainer>
          <Icon
            raised
            reverse
            type="ionicon"
            name="md-person-add"
            color="#dde5f7"
            reverseColor="#5280e2"
            size={25}
            onPress={() => this._navigateTo('NewRider', { userType: 'rider' })}
            disabled={false}
          />
          <LabelText>Create new rider</LabelText>
        </IconContainer>

        <IconContainer>
          <Icon
            raised
            reverse
            type="ionicon"
            name="md-download"
            color="#dde5f7"
            reverseColor="#5280e2"
            size={25}
            onPress={() => this._navigateTo('NewRider', { userType: 'rider' })}
            disabled={false}
          />
          <LabelText>Import user's riders</LabelText>
        </IconContainer>

        <IconContainer>
          <Icon
            raised
            reverse
            type="ionicon"
            name="ios-trash"
            color="#fad0d2"
            reverseColor="#ee0000"
            size={25}
            onPress={handleOnDelete}
            disabled={false}
          />
          <DeleteLabelText>Delete Group</DeleteLabelText>
        </IconContainer>

        <StyledBottomContainer>
          <FormButton
            onPress={handleSubmit}
            title="Save Changes"
            textColor="white"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
        </StyledBottomContainer>
        {errors.general && <FormattedError errorValue={errors.general} />}
      </Fragment>
    )}
  </Formik>
);

export default Form;
