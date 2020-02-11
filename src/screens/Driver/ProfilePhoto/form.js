import React, { Fragment } from 'react';
import { Image } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer } from '../../../components/Form/Elements';

const IconContainer = styled(ButtonContainer)`
  margin-bottom: 80px;
  margin-top: 70px;
  align-items: center;
`;
const SubIcon = styled(ButtonContainer)`
  margin-top: -50px;
  margin-right: -50px;
  margin-bottom: 0;
`;

const Form = ({ handleOnSubmit, initialValues, validationSchema, handleChoosePhoto, photo }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleSubmit, errors, isValid, isSubmitting }) => (
      <Fragment>
        <IconContainer>
          {photo && <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />}
          <Icon
            raised
            reverse
            name="md-person"
            type="ionicon"
            color="#dde5f7"
            reverseColor="#5280e2"
            size={70}
            onPress={handleChoosePhoto}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
          <SubIcon>
            <Icon
              reverse
              raised
              name="add-a-photo"
              size={20}
              color="#5280e2"
              onPress={handleChoosePhoto}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
            />
          </SubIcon>

          <Button
            title="Add photo"
            onPress={handleChoosePhoto}
            titleStyle={{
              color: '#5280e2'
              // textDecorationLine: 'underline'
            }}
            type="clear"
          />
        </IconContainer>

        <ButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Next"
            textColor="white"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
        </ButtonContainer>

        {errors.general && <FormattedError errorValue={errors.general} />}
      </Fragment>
    )}
  </Formik>
);

export default Form;
