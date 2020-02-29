import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Avatar } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomButtonContainer } from '../../../components/Form/Elements';

const IconContainer = styled(ButtonContainer)`
  margin-bottom: 80px;
  margin-top: 70px;
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
      handleSubmit, errors, isValid, isSubmitting,
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

          <Button
            title="Add photo"
            onPress={handleChoosePhoto}
            titleStyle={{
              color: '#5280e2',
            }}
            type="clear"
          />
        </IconContainer>

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Next"
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
  handleChoosePhoto: PropTypes.shape.isRequired,
  photo: PropTypes.shape.isRequired,
};

export default Form;
