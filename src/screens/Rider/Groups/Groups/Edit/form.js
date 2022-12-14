import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import { Icon, Avatar, CheckBox } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../../../components/Form/FormButton';
import ErrorMessage, { FormattedError } from '../../../../../components/Form/ErrorMessage';
import { ButtonContainer, Headline, BottomButtonContainer } from '../../../../../components/Form/Elements';
import FormInput from '../../../../../components/Form/Fields/FormInput';

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
const FieldContainer = styled(View)`
  margin-right: 15px;
  margin-left: 15px;
`;

const Form = ({
  handleOnSubmit,
  initialValues,
  validationSchema,
  handleOnDelete,
  handleOnEditNewRider,
  handleOnAddRider,
  handleOnCreateRider,
  handleOnImportRider,
  handleOnAddExternalRider,
}) => (
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
      handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, setFieldValue,
    }) => (
      <>
        <FormInput
          name="name"
          label="Group Name"
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          placeholder="name..."
          autoCapitalize="words"
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
              color: '#6b768d',
            }}
            checked={values.isDefault}
            onPress={() => setFieldValue('isDefault', !values.isDefault)}
          />
          <ErrorMessage name="isDefault" touched={touched} errors={errors} />
        </FieldContainer>

        <StyledHeadline>Riders</StyledHeadline>

        {values.riders.map(rider => (
          <RiderContainer key={rider.id.toString()}>
            <Avatar
              rounded
              source={{
                uri: `https://${rider.pictureUrl}`,
              }}
              showEditButton={false}
              icon={{
                name: 'md-person',
                type: 'ionicon',
                color: '#5280e2',
              }}
              overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
              activeOpacity={0.7}
              size={53}
              onPress={() => handleOnEditNewRider(rider.id)}
              disabled={false}
            />
            <LabelText>{`  ${rider.name}`}</LabelText>
          </RiderContainer>
        ))}

        <IconContainer>
          <Icon
            raised
            reverse
            type="material"
            name="group-add"
            color="#dde5f7"
            reverseColor="#5280e2"
            size={25}
            onPress={handleOnAddRider}
            disabled={false}
          />
          <LabelText>Add riders</LabelText>
        </IconContainer>

        <IconContainer>
          <Icon
            raised
            reverse
            type="ionicon"
            name="md-person-add"
            color="#dde5f7"
            reverseColor="#5280e2"
            size={25}
            onPress={handleOnCreateRider}
            disabled={false}
          />
          <LabelText>Create new rider</LabelText>
        </IconContainer>

        <IconContainer>
          <Icon
            raised
            reverse
            type="material"
            name="import-export"
            color="#dde5f7"
            reverseColor="#5280e2"
            size={25}
            onPress={handleOnImportRider}
            disabled={false}
          />
          <LabelText>Request parent access</LabelText>
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
            onPress={handleOnAddExternalRider}
            disabled={false}
          />
          <LabelText>Import user&apos;s riders</LabelText>
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

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Save Changes"
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
  initialValues: PropTypes.shape({}).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleOnEditNewRider: PropTypes.func.isRequired,
  handleOnAddRider: PropTypes.func.isRequired,
  handleOnCreateRider: PropTypes.func.isRequired,
  handleOnImportRider: PropTypes.func.isRequired,
  handleOnAddExternalRider: PropTypes.func.isRequired,
  handleOnDelete: PropTypes.func.isRequired,
};

export default Form;
