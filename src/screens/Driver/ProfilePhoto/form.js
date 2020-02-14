import React, { Fragment } from 'react';
import { Image } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon, Avatar } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomContainer, BottomButtonContainer } from '../../../components/Form/Elements';

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
const StyledBottomContainer = styled(BottomContainer)`
  left: 0;
  right: 0;
  margin-left: 25px;
  margin-right: 25px;
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
          <Avatar
            rounded
            // source={{
            //   uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
            // }}
            // source={require('../../../../../assets/edit-rider.png')}
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
            size={120}
            onPress={handleChoosePhoto}
            onEditPress={handleChoosePhoto}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />

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
      </Fragment>
    )}
  </Formik>
);

export default Form;
