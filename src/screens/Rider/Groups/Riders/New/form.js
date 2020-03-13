import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Avatar } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../../../components/Form/FormButton';
import { FormattedError } from '../../../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomButtonContainer } from '../../../../../components/Form/Elements';
import FormInput from '../../../../../components/Form/Fields/FormInput';

const IconContainer = styled(ButtonContainer)`
  margin-bottom: 5px;
  margin-top: 120px;
  align-items: center;
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
      marginBottom: 20,
    }}
    icon={{
      name: 'md-person',
      type: 'ionicon',
      color: '#5280e2',
    }}
    overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
    activeOpacity={0.7}
    size={110}
    {...props}
  />
);

const Form = ({
  handleOnSubmit, initialValues, validationSchema, handleChoosePhoto, photo,
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
      handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur,
    }) => (
      <>
        <IconContainer>
          {photo ? (
            <PhotoAvatar
              source={{
                uri: photo.uri,
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
          autoCapitalize="words"
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
      </>
    )}
  </Formik>
);

Form.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleChoosePhoto: PropTypes.func.isRequired,
  photo: PropTypes.shape({}).isRequired,
};

export default Form;
