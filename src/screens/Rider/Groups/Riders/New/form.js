import React, { Fragment } from 'react';
import { Image, View } from 'react-native';
import { Formik } from 'formik';
import { Avatar } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../../../components/Form/FormButton';
import { FormattedError } from '../../../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomContainer, BottomButtonContainer } from '../../../../../components/Form/Elements';
import FormInput from '../../../../../components/Form/Fields/FormInput';

const IconContainer = styled(ButtonContainer)`
  margin-bottom: 5px;
  margin-top: 120px;
  align-items: center;
`;
const StyledBottomContainer = styled(BottomContainer)`
  left: 0;
  right: 0;
  margin-left: 25px;
  margin-right: 25px;
`;

const PhotoAvatar = props => (
  <Avatar
    rounded
    showEditButton
    editButton={{
      name: 'photo-camera',
      type: 'material',
      reverse: true,
      color: '#5280e2',
      reverseColor: '#fff',
      underlayColor: '#5280e2',
      size: 17,
      marginRight: 18,
      marginBottom: 20
    }}
    icon={{
      name: 'md-person',
      type: 'ionicon',
      color: '#5280e2'
    }}
    overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
    activeOpacity={0.7}
    size={110}
    {...props}
  />
);

const Form = ({ handleOnSubmit, initialValues, validationSchema, handleChoosePhoto, photo }) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur }) => (
      <Fragment>
        <IconContainer>
          {photo ? (
            <PhotoAvatar
              source={{
                uri: photo.uri
              }}
              onPress={handleChoosePhoto}
              onEditPress={handleChoosePhoto}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
            />
          ) : (
            <PhotoAvatar
              onPress={handleChoosePhoto}
              onEditPress={handleChoosePhoto}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
            />
          )}
        </IconContainer>

        <FormInput
          name="name"
          label="Name"
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

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Continue"
            textColor="white"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
        </BottomButtonContainer>
      </Fragment>
    )}
  </Formik>
);

export default Form;
