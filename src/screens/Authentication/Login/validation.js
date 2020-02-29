import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .label('Phone Number')
    .required()
    .min(2, 'Must have at least 2 characters'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters'),
});

export default validationSchema;
