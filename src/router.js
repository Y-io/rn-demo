import { createStackNavigator } from 'react-navigation'
import Main from './screen/main'
import Wallet from './screen/wallet'
// import Page from './page'

export default createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: () => ({
        title: '列表',
      }),
    },
    Wallet: {
      screen: Wallet,
    },
  },
  { initialRouteName: 'Wallet' },
)
