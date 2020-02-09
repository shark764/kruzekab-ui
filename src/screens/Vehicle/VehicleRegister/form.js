import React, { Fragment } from 'react';
import { Image } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon } from 'react-native-elements';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormPicker from '../../../components/Form/Fields/FormPicker';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer } from '../../../components/Form/Elements';

const Form = ({ handleOnSubmit, initialValues, validationSchema, handleChoosePhoto, photo }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur }) => (
      <Fragment>
        <FormPicker
          // mode="dropdown"
          name="car"
          label="Car"
          placeholder={{
            label: 'Choose vehicle branch...',
            value: '',
            color: '#9ea0a4'
          }}
          selectedValue={values.car}
          onValueChange={handleChange('car')}
          onBlur={handleBlur('car')}
          items={[
            { label: 'Toyota', value: 'toyota' },
            { label: 'Honda', value: 'honda' },
            { label: 'Nissan', value: 'nissan' }
          ]}
          useNativeAndroidPickerStyle={false}
          touched={touched}
          errors={errors}
        />

        <FormPicker
          // mode="dropdown"
          name="model"
          label="Model"
          // prompt="Choose model model..."
          placeholder={{
            label: 'Choose vehicle model...',
            value: '',
            color: '#9ea0a4'
          }}
          selectedValue={values.model}
          onValueChange={handleChange('model')}
          onBlur={handleBlur('model')}
          items={[
            { label: 'Corolla', value: 'corolla' },
            { label: 'Yaris', value: 'yaris' },
            { label: 'Civic', value: 'civic' },
            { label: 'Accord', value: 'accord' },
            { label: 'Sentra', value: 'sentra' },
            { label: 'Altima', value: 'altima' }
          ]}
          useNativeAndroidPickerStyle={false}
          touched={touched}
          errors={errors}
        />

        <FormInput
          name="vehicleYear"
          label="Year"
          value={values.vehicleYear}
          onChangeText={handleChange('vehicleYear')}
          onBlur={handleBlur('vehicleYear')}
          placeholder="vehicle year..."
          autoCapitalize="none"
          iconName="md-calendar"
          iconColor="#2C384A"
          keyboardType="numeric"
          touched={touched}
          errors={errors}
        />

        <FormInput
          name="maxSeats"
          label="Max. Seats"
          value={values.maxSeats}
          onChangeText={handleChange('maxSeats')}
          onBlur={handleBlur('maxSeats')}
          placeholder="max. seats..."
          autoCapitalize="none"
          iconName="md-car"
          iconColor="#2C384A"
          keyboardType="numeric"
          touched={touched}
          errors={errors}
        />

        {photo && <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />}
        <Button
          title="Upload proof of car insurance"
          onPress={handleChoosePhoto}
          titleStyle={{
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 14,
            color: '#5280e2'
          }}
          type="clear"
          icon={<Icon reverse raised name="add-a-photo" size={15} color="#DDE5F7" reverseColor="#5280e2" />}
        />

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
