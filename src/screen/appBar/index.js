import React, { Component } from 'react'

import {
  Text,
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native'
import Data from './items'

const { height } = Dimensions.get('window')
const ScrollViewHeight = height - 56
const HEAD_MAX_HEIGHT = 160
const HEAD_MIN_HEIGHT = 56

export default class AppBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      y: new Animated.Value(0),
      // h: new Animated.Value(0),
    }
  }

  render() {
    // const { y, h } = this.state

    const headHeight = this.state.y.interpolate({
      inputRange: [0, HEAD_MAX_HEIGHT - HEAD_MIN_HEIGHT],
      outputRange: [HEAD_MAX_HEIGHT, HEAD_MIN_HEIGHT],
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    })
    return (
      <View style={styles.root}>
        <Animated.View style={[styles.head, { height: headHeight }]}>
          <Text style={[styles.headText]}>头部</Text>
        </Animated.View>
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.y } } },
          ])}
        >
          {Data.map(item => (
            <View
              key={item.name}
              style={[styles.card, { backgroundColor: item.color }]}
            >
              <Text>
                {item.name} - {item.price}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  card: {
    height: 200,
    borderRadius: 10,
  },
  head: {
    // height: 56,
    backgroundColor: 'red',
  },
  headText: {
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 20,
    color: '#fff',
  },
})
