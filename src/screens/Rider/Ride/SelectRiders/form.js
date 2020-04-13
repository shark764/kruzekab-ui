import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import { ListItem, Icon } from 'react-native-elements';
import {
  View, FlatList, ActivityIndicator, Text,
} from 'react-native';
import { FormattedError } from '../../../../components/Form/ErrorMessage';
import { BottomButtonContainer, ButtonContainer } from '../../../../components/Form/Elements';
import FormButton from '../../../../components/Form/FormButton';

const ListContainer = styled(View)`
  margin-left: 10px;
  margin-right: 10px;
  flex: 1;
  position: relative;
  border-top-width: 1px;
  border-color: #bbb;
  background-color: white;
`;
const LoadingIcon = styled(View)`
  padding-vertical: 20px;
  border-top-width: 1px;
  border-color: #ced0ce;
`;
const IconContainer = styled(ButtonContainer)`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
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

const CountSelected = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 16px;
  color: #6b768d;
  letter-spacing: 0.2px;
`;

const renderItem = (item, handleOnSelected) => (
  <ListItem
    roundAvatar
    title={item.name}
    leftAvatar={{
      source: {
        uri: `https://${item.pictureUrl}`,
      },
      title: item.initials,
      size: 55,
    }}
    onPress={() => handleOnSelected(item)}
    // bottomDivider
    titleStyle={{
      width: 200,
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      color: '#6b768d',
    }}
    rightIcon={
      item.isSelect
        ? {
          name: 'ios-checkmark-circle',
          type: 'ionicon',
          color: '#5280e2',
        }
        : {}
    }
  />
);

const renderFooter = loading => {
  if (!loading) {
    return null;
  }

  return (
    <LoadingIcon>
      <ActivityIndicator animating size="large" />
    </LoadingIcon>
  );
};

const Form = ({
  dataSource,
  handleOnSelected,
  handleOnSubmit,
  handleRefresh,
  loading,
  refreshing,
  handleOnAddRiderToGroup,
  countSelected,
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
          <IconContainer>
            <Icon
              raised
              reverse
              type="ionicon"
              name="md-person"
              color="#dde5f7"
              reverseColor="#5280e2"
              size={25}
              onPress={handleOnAddRiderToGroup}
              disabled={false}
            />
            <LabelText>Add rider</LabelText>
          </IconContainer>

          <FlatList
            data={dataSource}
            renderItem={({ item }) => renderItem(item, handleOnSelected)}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={() => renderFooter(loading)}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        </ListContainer>

        <CountSelected>{`${countSelected} riders selected`}</CountSelected>

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
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  ).isRequired,
  handleRefresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
  handleOnAddRiderToGroup: PropTypes.func.isRequired,
  countSelected: PropTypes.number,
};

Form.defaultProps = {
  countSelected: 0,
};

export default Form;
