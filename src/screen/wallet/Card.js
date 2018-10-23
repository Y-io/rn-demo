import React, { Component } from 'react'
import PropType from 'prop-types'
import { Text, StyleSheet, View } from 'react-native'

export const cardHeight = 250
export const cardTitle = 45
export const cardPadding = 10

export default class Card extends Component {
  static propTypes = {
    name: PropType.string.isRequired,
    color: PropType.string.isRequired,
    price: PropType.string.isRequired,
  }

  render() {
    const { color, name, price } = this.props
    return (
      <View style={[styles.card, { backgroundColor: color }]}>
        {/* <Text>
          {name} - {price}
        </Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: cardHeight,
    borderRadius: 10,
  },
})
