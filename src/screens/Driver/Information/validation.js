import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  check: Yup.boolean().oneOf([true], 'Please check the agreement'),
  birthdate: Yup.date()
    .typeError('Value must be a valid date')
    .required(),
  licenseNumber: Yup.number()
    .typeError('Value must be a number')
    .required()
    .integer('Value can only contain integers')
    .positive('Value must be greater than zero')
  // gender: Yup.boolean().oneOf(['male', 'female'], 'Please choose a value')
});
