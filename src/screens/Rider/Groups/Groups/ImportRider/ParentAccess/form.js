import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Avatar } from 'react-native-elements';
import { Text } from 'react-native';
import { FormattedError } from '../../../../../../components/Form/ErrorMessage';
import { ButtonContainer } from '../../../../../../components/Form/Elements';

const ClientContainer = styled(ButtonContainer)`
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  margin-top: 0;
  margin-left: 25px;
`;
const LabelText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #6b768d;
  justify-content: center;
  align-items: center;
`;

const Form = ({ externalClients, handleOnSelected }) => (
  <Formik
    enableReinitialize
    initialValues={{}}
    onSubmit={values => {
      console.log('values =>', values);
    }}
  >
    {({ errors }) => (
      <>
        {externalClients.map(client => (
          <ClientContainer key={client.get('id')}>
            <Avatar
              rounded
              showEditButton={false}
              icon={{
                name: 'group-add',
                type: 'material',
                color: '#5280e2',
              }}
              overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
              activeOpacity={0.7}
              size={53}
              onPress={() => handleOnSelected(client.get('id'))}
              disabled={false}
            />
            <LabelText>{`  ${client.get('name')}`}</LabelText>
          </ClientContainer>
        ))}

        {errors.general && <FormattedError errorValue={errors.general} />}
      </>
    )}
  </Formik>
);

Form.propTypes = {
  handleOnSelected: PropTypes.func.isRequired,
  externalClients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  ).isRequired,
};

export default Form;
