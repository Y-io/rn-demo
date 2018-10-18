import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  Animated,
  Dimensions,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class AppStore extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.item !== state.item) {
      return { item: props.item }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      scale: new Animated.Value(1),
      item: {},
    }
    this.getImageWH = {}
  }

  // extrapolateLeft: 'clamp',
  //           extrapolateRight: 'clamp',
  onPressIn = () => {
    Animated.spring(this.state.scale, {
      duration: 1000,
      toValue: 0.96,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.8, 1, 1),
    }).start()
  }

  onPressOut = () => {
    Animated.spring(this.state.scale, {
      duration: 1000,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.8, 1, 1),
    }).start()
  }

  onPress = () => {
    // console.log(this.getImageWH)

    this.getImageWH.measure((x, y, width, height, pageX, pageY) => {
      const json = { x, y, width, height, pageX, pageY }
      console.log('穿过去之前：', this.state.item)
      this.props.onClick(this.state.item.src, json)
    })
  }

  render() {
    const { scale, item } = this.state

    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.onPressIn(item.id)}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
        key={item.id}
      >
        <Animated.View
          style={{
            height: height * 0.6,
            padding: 15,
            width,
            borderRadius: 14,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowRadius: 8,
            transform: [{ scale }],
          }}
        >
          <Image
            source={item.src}
            ref={v => (this.getImageWH = v)}
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: 'cover',
              borderRadius: 14,
            }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

AppStore.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
}
