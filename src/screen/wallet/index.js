import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native'
import Card, { cardHeight, cardTitle, cardPadding } from './Card'

import items from './items'

const { height } = Dimensions.get('window')

export default class Wallet extends Component {
  state = {
    y: new Animated.Value(0),
  }

  render() {
    const { y } = this.state
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {items.map((item, i) => {
              const inputRange = [-cardHeight, 0]
              const outputRange = [
                cardHeight * i,
                (cardHeight - cardTitle) * -i,
              ]
              if (i > 0) {
                inputRange.push(cardPadding * i)
                outputRange.push((cardHeight - cardPadding) * -i)
              }
              const translateY = y.interpolate({
                inputRange,
                outputRange,
                extrapolateRight: 'clamp',
              })
              return (
                <Animated.View
                  key={item.name}
                  style={{ transform: [{ translateY }] }}
                >
                  <Card {...item} />
                </Animated.View>
              )
            })}
          </View>
          <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y },
                  },
                },
              ],
              { useNativeDriver: true }, // <-- 加上这一行
            )}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16,
  },
  container: {
    flex: 1,
  },
  content: {
    height: height * 2,
  },
  // card: {
  //   height: cardHeight,
  //   borderRadius: 10,
  // },
})
