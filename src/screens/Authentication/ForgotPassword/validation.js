import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().label('Phone Number').required().min(2, 'Must have at least 2 characters'),
  newPassword: Yup.string().label('Password').required().min(6, 'Password should be at least 6 characters'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
});

export default validationSchema;
