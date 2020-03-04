import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Avatar } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../../components/Form/FormButton';
import { FormattedError } from '../../../../components/Form/ErrorMessage';
import { BottomButtonContainer } from '../../../../components/Form/Elements';

const SelectionContainer = styled(View)`
  flex-direction: row;
  margin-left: 35px;
  margin-right: 35px;
`;
const ListContainer = styled(View)`
  flex: 1;
  margin-left: 35px;
  margin-right: 35px;
  flex-direction: row;
  justify-content: center;
`;
const OptionContainer = styled(View)`
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 20px;
  padding-bottom: 10px;
  background: #ffffff;
  border: ${props => (props.selected ? '1px solid #5280E2;' : '1px solid #dde5f7')};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  align-items: center;
  height: 150px;
  width: 155px;
`;
const ContainerText = styled(View)`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const RiderTitle = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-size: 15px;
  display: flex;
  align-items: center;
  font-weight: ${props => (props.selected ? '600' : 'normal')};
  color: ${props => (props.selected ? '#5280e2' : '#6b768d')};
`;

const PhotoAvatar = props => (
  <Avatar
    rounded
    icon={{
      name: 'md-person',
      type: 'ionicon',
      color: '#5280e2',
    }}
    overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
    activeOpacity={0.7}
    size={80}
    {...props}
  />
);

const riders = [{ key: 1, title: 'Ben', imgPath: require('../../../../assets/edit-rider2.png') }];
const riders2 = [
  { key: 2, title: 'Claire', imgPath: require('../../../../assets/edit-rider.png') },
  { key: 3, title: 'Amelia', imgPath: require('../../../../assets/edit-rider3.png') },
];

const Form = ({
  handleOnSubmit,
  initialValues,
  validationSchema,
  handleOnSelected,
  selected,
  handleOnAddRiderToGroup,
}) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}
  >
    {({
      handleSubmit, errors, isValid, isSubmitting,
    }) => (
      <>
        <SelectionContainer>
          <ListContainer>
            <TouchableOpacity onPress={handleOnAddRiderToGroup}>
              <OptionContainer>
                <PhotoAvatar />

                <ContainerText>
                  <RiderTitle>Add rider</RiderTitle>
                </ContainerText>
              </OptionContainer>
            </TouchableOpacity>
          </ListContainer>

          {riders.map(rider => (
            <ListContainer key={rider.key}>
              <TouchableOpacity onPress={() => handleOnSelected(rider.key)}>
                <OptionContainer selected={selected.includes(rider.key)}>
                  <PhotoAvatar source={rider.imgPath} />
                  <ContainerText>
                    <RiderTitle selected={selected.includes(rider.key)}>{rider.title}</RiderTitle>
                  </ContainerText>
                </OptionContainer>
              </TouchableOpacity>
            </ListContainer>
          ))}
        </SelectionContainer>

        <SelectionContainer>
          {riders2.map(rider => (
            <ListContainer key={rider.key}>
              <TouchableOpacity onPress={() => handleOnSelected(rider.key)}>
                <OptionContainer selected={selected.includes(rider.key)}>
                  <PhotoAvatar source={rider.imgPath} />
                  <ContainerText>
                    <RiderTitle selected={selected.includes(rider.key)}>{rider.title}</RiderTitle>
                  </ContainerText>
                </OptionContainer>
              </TouchableOpacity>
            </ListContainer>
          ))}
        </SelectionContainer>

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Continue"
            textColor="white"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
        </BottomButtonContainer>
      </>
    )}
  </Formik>
);

Form.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleOnSelected: PropTypes.func.isRequired,
  selected: PropTypes.shape([]).isRequired,
  handleOnAddRiderToGroup: PropTypes.func.isRequired,
};

export default Form;
