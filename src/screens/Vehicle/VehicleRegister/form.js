import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { Button, Icon, Image } from 'react-native-elements';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormPicker from '../../../components/Form/Fields/FormPicker';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomButtonContainer } from '../../../components/Form/Elements';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';

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
        <FormInput
          name="car"
          label="Car"
          value={values.car}
          onChangeText={handleChange('car')}
          onBlur={handleBlur('car')}
          placeholder="vehicle branch..."
          autoCapitalize="none"
          iconName="md-car"
          iconColor="#2C384A"
          touched={touched}
          errors={errors}
        />

        <FormInput
          name="model"
          label="Model"
          value={values.model}
          onChangeText={handleChange('model')}
          onBlur={handleBlur('model')}
          placeholder="vehicle model..."
          autoCapitalize="none"
          iconName="md-car"
          iconColor="#2C384A"
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
