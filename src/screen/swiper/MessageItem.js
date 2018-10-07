import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'

export default class MessageItem extends Component {
  constructor() {
    super()
    this.state = {
      appearance: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.parallel([
      // 从0到1的不透明度动画
      Animated.timing(this.state.appearance, {
        toValue: 1,
        duration: 500,
        delay: (this.props.index || 1) * 120,
      }),
    ]).start()
  }

  render() {
    const style = {
      ...styles.container,
      opacity: this.state.appearance,
      // 将外观动画值绑定（插值）到边距
      marginTop: this.state.appearance.interpolate({
        inputRange: [0, 1],
        outputRange: [60, 18],
      }),
    }
    return <Animated.View style={style} />
  }
}

const styles = {
  container: {
    backgroundColor: '#999',
    borderRadius: 5,
    height: 65,
    width: '90%',
    marginLeft: '5%',
    marginTop: 40,
  },
}
