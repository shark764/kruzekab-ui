import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import { ListItem } from 'react-native-elements';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { FormattedError } from '../../../../../../components/Form/ErrorMessage';
import { BottomButtonContainer } from '../../../../../../components/Form/Elements';
import FormButton from '../../../../../../components/Form/FormButton';

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

const renderItem = (item, handleOnSelected) => (
  <ListItem
    roundAvatar
    title={item.name}
    leftAvatar={{
      source: {
        uri: `http://${item.pictureUrl}`,
      },
      title: item.initials,
    }}
    onPress={() => handleOnSelected(item)}
    bottomDivider
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
  dataSource, handleOnSelected, handleOnSubmit, handleRefresh, loading, refreshing,
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
            renderItem={({ item }) => renderItem(item, handleOnSelected)}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={() => renderFooter(loading)}
            onRefresh={handleRefresh}
            refreshing={refreshing}
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
  dataSource: PropTypes.shape([]).isRequired,
  handleRefresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
};

export default Form;
