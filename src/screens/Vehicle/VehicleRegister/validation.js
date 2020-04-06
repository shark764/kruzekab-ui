import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  car: Yup.string().label('Car').required(),
  model: Yup.string().label('Model').required(),
  vehicleYear: Yup.number()
    .label('Year')
    .typeError('Value must be a number')
    .required()
    .integer('Value can only contain integers')
    .positive('Value must be greater than zero'),
  maxSeats: Yup.number()
    .label('Max. Seats')
    .typeError('Value must be a number')
    .required()
    .integer('Value can only contain integers')
    .positive('Value must be greater than zero'),
});

export default validationSchema;
