import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Avatar } from 'react-native-elements';
import {
  Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import { FormattedError } from '../../../../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomButtonContainer } from '../../../../../../components/Form/Elements';
import FormButton from '../../../../../../components/Form/FormButton';

const ListContainer = styled(View)`
  margin-left: 20px;
  margin-right: 25px;
  flex: 1;
  position: relative;
`;
const LightText = styled(Text)`
  width: 200px;
  padding-left: 15px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #6b768d;
`;
const ListItem = styled(TouchableOpacity)`
  padding-vertical: 5px;
  padding-left: 5px;
  margin-top: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  margin-left: 0px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: -1;
  border-radius: 4px;
  ${props => props.isSelect && 'background-color: #eee'};
`;
const LineSeparator = styled(View)`
  height: 0.5px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;

const FlatListItemSeparator = () => <LineSeparator />;

const renderItem = (data, handleOnSelected) => (
  <ListItem isSelect={data.item.isSelect} onPress={() => handleOnSelected(data)}>
    <Avatar
      rounded
      source={{
        uri: `http://${data.item.pictureUrl}`,
      }}
      showEditButton={false}
      icon={{
        name: 'md-person',
        type: 'ionicon',
        color: '#5280e2',
      }}
      overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
      activeOpacity={0.7}
      size={53}
      onPress={() => handleOnSelected(data)}
      disabled={false}
    />
    <LightText>{data.item.name}</LightText>
  </ListItem>
);

const Form = ({
  riders, dataSource, handleOnSelected, handleOnSubmit,
}) => (
  <Formik
    enableReinitialize
    initialValues={{}}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
  >
    {({
      handleSubmit, errors, isValid, isSubmitting,
    }) => (
      <>
        <ListContainer>
          <FlatList
            data={dataSource}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={item => renderItem(item, handleOnSelected)}
            keyExtractor={item => item.id.toString()}
          />
        </ListContainer>

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
  handleOnSelected: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  riders: PropTypes.shape([]).isRequired,
  dataSource: PropTypes.shape([]).isRequired,
};

export default Form;
