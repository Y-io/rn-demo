import { createStackNavigator } from 'react-navigation'
import Main from './screen/main'

export default createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  { initialRouteName: 'Main' },
)
