import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import { Avatar, Icon, Badge } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer, BottomButtonContainer } from '../../../components/Form/Elements';

const IconContainer = styled(ButtonContainer)`
  margin-bottom: 5px;
  flex-direction: row;
`;

const PhotoAvatar = props => (
  <Avatar
    rounded
    showEditButton={false}
    icon={{
      name: 'md-person',
      type: 'ionicon',
      color: '#5280e2',
    }}
    overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
    activeOpacity={0.7}
    size={60}
    {...props}
  />
);

const Form = ({ handleOnSubmit, currentRide, selectedGroup }) => (
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
        <View style={{ flexDirection: 'column' }}>
          <IconContainer>
            <PhotoAvatar
              source={{
                uri: `https://${currentRide.getIn(['driver', 'generalInfo', 'profilePictureUrl'])}`,
              }}
            />
            <View
              style={{
                textAlign: 'left',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                {currentRide.getIn(['driver', 'generalInfo', 'name'])}
              </Text>
              <Icon style={{ marginLeft: 5 }} name="ios-star" type="ionicon" color="#4cca8d" />
            </View>
          </IconContainer>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginLeft: 25,
              marginTop: 15,
              fontSize: 20,
            }}
          >
            <Badge
              value={currentRide.getIn(['driver', 'vehicle', 'automaker'], '').toUpperCase()}
              badgeStyle={{
                color: '#212226',
                backgroundColor: '#a8b4cd',
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              textStyle={{ fontSize: 18 }}
            />
          </View>

          <View style={{ flexDirection: 'row', flex: 1, marginTop: 15 }}>
            <Text
              style={{
                marginLeft: 25,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 28,
                letterSpacing: 0.2,
                color: '#3e4958',
              }}
            >
              Passengers
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginTop: 5,
              marginLeft: 25,
            }}
          >
            <Badge
              value={currentRide.get('riders').size}
              badgeStyle={{
                color: '#212226',
                backgroundColor: '#a8b4cd',
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              textStyle={{ fontSize: 14 }}
            />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 28,
                letterSpacing: 0.2,
                color: '#6b768d',
              }}
            >
              {currentRide
                .get('riders')
                .toJS()
                .map(rider => rider.name)
                .join(', ')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginTop: 5,
              marginLeft: 25,
            }}
          >
            <Icon style={{ marginLeft: 5 }} name="map-marker" type="material-community" color="#4cca8d" />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 28,
                letterSpacing: 0.2,
                color: '#6b768d',
              }}
            >
              {selectedGroup.get('name')}
            </Text>
            <View style={{ flexDirection: 'row', flex: 1, marginLeft: 25 }}>
              {currentRide.get('riders').map(rider => (
                <Avatar
                  key={rider.get('id')}
                  rounded
                  source={{
                    uri: `https://${rider.get('pictureUrl')}`,
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
                />
              ))}
            </View>
          </View>
        </View>

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            buttonType="outline"
            onPress={handleSubmit}
            title="Open driver's camera"
            buttonColor="#5280e2"
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
  currentRide: PropTypes.shape({
    toJS: PropTypes.func,
    getIn: PropTypes.func,
    get: PropTypes.func,
  }).isRequired,
  selectedGroup: PropTypes.shape({
    toJS: PropTypes.func,
    getIn: PropTypes.func,
    get: PropTypes.func,
  }).isRequired,
};

export default Form;
