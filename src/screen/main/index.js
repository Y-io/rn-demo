import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native'

const screenConf = [
  {
    label: '钱包',
    path: 'Wallet',
  },
]

export default class App extends Component {
  goToPath = path => {
    this.props.navigation.push(path)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {screenConf.map(item => (
          <TouchableHighlight
            key={item.path}
            onPress={() => this.goToPath(item.path)}
          >
            <View style={styles.listItem}>
              <Text style={styles.title}>{item.label}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    height: 56,
    backgroundColor: '#999',
  },
  title: {
    textAlign: 'center',
    lineHeight: 56,
    fontSize: 20,
  },
})
