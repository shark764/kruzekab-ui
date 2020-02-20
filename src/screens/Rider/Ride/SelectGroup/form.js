import React, { Fragment } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { Icon, Image } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../../components/Form/FormButton';
import { FormattedError } from '../../../../components/Form/ErrorMessage';
import { BottomButtonContainer } from '../../../../components/Form/Elements';

const SelectGroupContainer = styled(View)`
  margin-top: 120px;
  flex: 1;
`;
const ListContainer = styled(View)`
  flex: 1;
  margin-left: 25px;
  margin-right: 25px;
`;
const OptionContainer = styled(View)`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  background: #ffffff;
  border: ${props => (props.selected ? '1px solid #5280E2;' : '1px solid #dde5f7')};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
`;
const ContainerText = styled(View)`
  flex: 1;
  flex-direction: column;
  margin-left: 12px;
  justify-content: center;
`;
const GroupTitle = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-size: 15px;
  display: flex;
  align-items: center;
  font-weight: ${props => (props.selected ? '600' : 'normal')};
  color: ${props => (props.selected ? '#5280e2' : '#6b768d')};
`;

const ListRow = ({ id, title, handleOnSelected, selected }) => (
  <TouchableOpacity onPress={() => handleOnSelected(id)}>
    <OptionContainer selected={selected === id}>
      <Icon
        raised
        reverse
        type="material"
        name="group"
        color="#dde5f7"
        reverseColor="#5280e2"
        size={15}
        onPress={() => handleOnSelected(id)}
        disabled={false}
      />
      <ContainerText>
        <GroupTitle selected={selected === id}>{title}</GroupTitle>
      </ContainerText>
      {selected === id && (
        <Icon
          raised
          reverse
          type="antdesign"
          name="check"
          color="#5280e2"
          size={10}
          onPress={() => handleOnSelected(id)}
          disabled={false}
          containerStyle={{
            marginTop: 5
          }}
          // ImageComponent={<Image PlaceholderContent={<ActivityIndicator />} />}
        />
      )}
    </OptionContainer>
  </TouchableOpacity>
);

const Listview = ({ groupList, handleOnSelected, selected }) => (
  <FlatList
    data={groupList}
    renderItem={({ item }) => (
      <ListContainer>
        <ListRow
          key={`${item.key}`}
          id={item.key}
          title={item.title}
          handleOnSelected={handleOnSelected}
          selected={selected}
        />
      </ListContainer>
    )}
  />
);

const getData = [
  { key: 1, title: 'Soccer Team' },
  { key: 2, title: "Ben's Class" },
  { key: 3, title: "Nancy's theater classes" },
  { key: 4, title: "Kid's School" }
];

const Form = ({ handleOnSubmit, initialValues, validationSchema, handleOnSelected, selected, handleOnAddGroup }) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleSubmit, errors, isValid, isSubmitting }) => (
      <Fragment>
        <SelectGroupContainer>
          <Listview groupList={getData} handleOnSelected={handleOnSelected} selected={selected} />

          <ListContainer>
            <TouchableOpacity onPress={handleOnAddGroup}>
              <OptionContainer>
                <Icon
                  raised
                  reverse
                  type="material"
                  name="group"
                  color="#dde5f7"
                  reverseColor="#5280e2"
                  size={15}
                  onPress={handleOnAddGroup}
                  disabled={false}
                />
                <ContainerText>
                  <GroupTitle>Create new group</GroupTitle>
                </ContainerText>
              </OptionContainer>
            </TouchableOpacity>
          </ListContainer>
        </SelectGroupContainer>

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
      </Fragment>
    )}
  </Formik>
);

export default Form;
