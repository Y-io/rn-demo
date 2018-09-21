import React, { Component } from 'react'

import AppNavigator from './src/router'

export default class App extends Component {
  render() {
    return <AppNavigator />
  }
}

// // 限制使用package.json中声明的包
// "import/no-extraneous-dependencies": 0,
// // 强制使用解构
// "react/destructuring-assignment": 0,
// // 不允许console
// "no-console": 0,
// // 不允许变量未声明使用
// "no-use-before-define": 0,
// // 强制将无状态React组件写为纯函数
// "react/prefer-stateless-function": 0,
// // 是否允许StyleSheet中有未使用的规则
// "react-native/no-unused-styles": 2,
// // 在必要时强制使用特定于平台的文件名
// "react-native/split-platform-components": 2,
// // 是否允许JSX中有内联样式
// "react-native/no-inline-styles": 2,
// // 样式中是否包含不是变量的颜色名称
// "react-native/no-color-literals": 0,
