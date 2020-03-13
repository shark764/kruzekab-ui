import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label('Username')
    .required()
    .min(6, 'Must have at least 6 characters'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(5, 'Password must have at least 6 characters'),
});

export default validationSchema;
