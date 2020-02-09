import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .label('Phone Number')
    .required()
    .min(2, 'Must have at least 2 characters')
  // email: Yup.string()
  //   .label('Email')
  //   .email('Enter a valid email')
  //   .required('Please enter a registered email')
});
