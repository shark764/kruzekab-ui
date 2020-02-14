import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  parentPhoneNumber: Yup.string()
    .label("Parent's Phone Number")
    .required()
    .min(2, 'Must have at least 2 characters')
});
