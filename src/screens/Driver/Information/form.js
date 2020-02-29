import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { Image, Button, Icon } from 'react-native-elements';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import FormRadioGroup from '../../../components/Form/Fields/FormRadioGroup';
import FormCheckbox from '../../../components/Form/Fields/FormCheckbox';
import { BottomButtonContainer } from '../../../components/Form/Elements';

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
      handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, setFieldValue,
    }) => (
      <>
        <FormInput
          name="birthdate"
          label="Birth Date"
          value={values.birthdate}
          onChangeText={handleChange('birthdate')}
          onBlur={handleBlur('birthdate')}
          placeholder="dd/mm/yyyy"
          autoCapitalize="none"
          iconName="md-calendar"
          iconColor="#2C384A"
          touched={touched}
          errors={errors}
        />

        <FormRadioGroup
          name="gender"
          label="Gender"
          items={[
            { title: 'Male', key: 'male' },
            { title: 'Female', key: 'female' },
          ]}
          value={values.gender}
          onPress={setFieldValue}
          touched={touched}
          errors={errors}
        />

        <FormInput
          name="licenseNumber"
          label="Driver License Number"
          value={values.licenseNumber}
          onChangeText={handleChange('licenseNumber')}
          onBlur={handleBlur('licenseNumber')}
          placeholder="00000000"
          autoCapitalize="none"
          iconType="font-awesome"
          iconName="drivers-license-o"
          iconColor="#2C384A"
          keyboardType="numeric"
          touched={touched}
          errors={errors}
        />

        <Button
          title="Upload photo of Driver's License"
          onPress={handleChoosePhoto}
          titleStyle={{
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 14,
            color: '#5280e2',
          }}
          type="clear"
          icon={<Icon reverse raised name="add-a-photo" size={15} color="#dde5f7" reverseColor="#5280e2" />}
        />
        {photo && (
        <View style={{ marginLeft: 'auto', marginRight: 'auto', flex: 1 }}>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 100, height: 100 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        )}

        <FormRadioGroup
          name="trafficViolation"
          label="Have you had a traffic violation in the last year"
          items={[
            { title: 'Yes', key: 'yes' },
            { title: 'No', key: 'no' },
          ]}
          value={values.trafficViolation}
          onPress={setFieldValue}
          touched={touched}
          errors={errors}
        />

        <FormCheckbox
          name="check"
          label="Background Check"
          containerStyle={{
            backgroundColor: '#fff',
            borderColor: '#fff',
          }}
          title="I agree to a background check and a driving record check"
          checked={values.check}
          onPress={() => setFieldValue('check', !values.check)}
          touched={touched}
          errors={errors}
        />

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
