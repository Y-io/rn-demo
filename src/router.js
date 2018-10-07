import { createStackNavigator } from 'react-navigation'
import Main from './screen/main'
import Wallet from './screen/wallet'
import Swiper from './screen/swiper'
import LiveProduct from './screen/liveProduct'

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
      navigationOptions: () => ({
        title: '钱包',
      }),
    },
    Swiper: {
      screen: Swiper,
      navigationOptions: { header: null },
    },
    LiveProduct: {
      screen: LiveProduct,
      navigationOptions: { header: null },
    },
  },
  { initialRouteName: 'LiveProduct' },
)
