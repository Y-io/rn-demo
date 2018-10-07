import React, { Component } from 'react'
import { SharedElementRenderer, SharedElement } from 'react-native-motion'

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native'

const screenConf = [
  {
    key: 0,
    label: '钱包0',
    path: 'Wallet',
  },
  {
    key: 1,
    label: '钱包1',
    path: 'Wallet',
  },
  {
    key: 2,
    label: '钱包2',
    path: 'Wallet',
  },
  {
    key: 3,
    label: '钱包3',
    path: 'Wallet',
  },
]
sharedElementRefs = {}
export default class App extends Component {
  state = {
    isDetailPage: true,
  }

  goToPath = path => {
    console.log(path)
    this.setState({ isDetailPage: true })
  }

  detailPage = isDetailPage => (
    <View
      style={[
        styles.detailPage,
        StyleSheet.absoluteFill,
        { zIndex: isDetailPage ? 9 : -1 },
      ]}
    >
      <SharedElement sourceId="source">
        <Text> 移动了 </Text>
      </SharedElement>
      <Text> dwadw </Text>
    </View>
  )

  render() {
    const { isDetailPage } = this.setState
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <SharedElementRenderer>
          {this.detailPage(isDetailPage)}
          <ScrollView style={styles.container}>
            {screenConf.map(item => (
              <TouchableHighlight
                key={item.key}
                onPress={() => this.goToPath(item.key)}
              >
                <SharedElement
                  ref={node => (sharedElementRefs[item.name] = node)}
                >
                  <View style={styles.listItem}>
                    <Text style={styles.title}>{item.label}</Text>
                  </View>
                </SharedElement>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </SharedElementRenderer>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    marginBottom: 20,
    height: 56,
    backgroundColor: '#999',
  },
  title: {
    textAlign: 'center',
    lineHeight: 56,
    fontSize: 20,
  },
  detailPage: {
    // position: 'absolute',
    // flex: 1,
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    zIndex: 9,
    backgroundColor: 'red',
    // opacity: 0.5,
  },
})
