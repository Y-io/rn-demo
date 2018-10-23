import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
// import Entypo from 'react-native-vector-icons/Entypo'

import AppStore from './appStore'
import Wallet from './wallet'
import AppBar from './appBar'

const tabBarIcon = (value, name) => (
  <Icon name={name} tabNavigatorConfig={value} />
)

const Icon = ({ tabNavigatorConfig, name }) => (
  // console.log('------------------', tabNavigatorConfig)
  <MaterialIcons name={name} color={tabNavigatorConfig.tintColor} size={24} />
)

Icon.propTypes = {
  tabNavigatorConfig: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}

export default createMaterialBottomTabNavigator(
  {
    AppStore: {
      screen: AppStore,
      navigationOptions: {
        tabBarLabel: '课程',
        tabBarIcon: v => tabBarIcon(v, 'photo-library'),
      },
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: {
        tabBarLabel: '活动',
        tabBarIcon: v => tabBarIcon(v, 'photo-library'),
      },
    },
    AppBar: {
      screen: AppBar,
      navigationOptions: {
        tabBarLabel: '活动',
        tabBarIcon: v => tabBarIcon(v, 'photo-library'),
      },
    },
  },
  {
    initialRouteName: 'AppStore',
    activeTintColor: '#3e2465',
    activeColor: '#f0edf6',
    // shifting: true,
    barStyle: { backgroundColor: 'rgba(255,255,255,.1)' },
  },
)
