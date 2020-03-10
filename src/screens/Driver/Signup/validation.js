import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label('Username')
    .required()
    .min(6, 'Must have at least 6 characters'),
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  phoneNumber: Yup.string()
    .label('Phone Number')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters'),
  occupation: Yup.string()
    .label('Primary Occupation')
    .required()
    .min(2, 'Must have at least 2 characters'),
});

export default validationSchema;
