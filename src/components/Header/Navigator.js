import { NavigationHeaderButtons, Item } from './HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const GoBackButton = props => (
  <NavigationHeaderButtons>
    <Item
      title="Go Back"
      buttonWrapperStyle={{
        marginLeft: 12,
        marginTop: 10
      }}
      useIconComponent={Ionicons}
      iconName="md-arrow-back"
      {...props}
    />
  </NavigationHeaderButtons>
);
