import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().label('Group Name').required().min(2, 'Must have at least 2 characters'),
});

export default validationSchema;
