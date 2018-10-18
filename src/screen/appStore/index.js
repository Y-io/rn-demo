import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Animated,
  StatusBar,
  Easing,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import Item from './item'

const H = Dimensions.get('window').height
const HEIGHT = H - H / 3
const WIDTH = Dimensions.get('window').width
// console.log(HEIGHT / 2)

const imgages = [
  { id: 0, src: require('./images/0.jpg') },
  { id: 1, src: require('./images/1.jpg') },
  { id: 2, src: require('./images/2.jpg') },
  { id: 3, src: require('./images/3.jpg') },
]

export default class AppStore extends React.Component {
  state = {
    imageSrc: null,
    closeValue: new Animated.Value(0),
  }

  componentWillMount() {
    this.allImages = {}
    this.oldPosition = {}
    this.P = new Animated.ValueXY()
    this.D = new Animated.ValueXY()
    this.contentValue = new Animated.Value(0)
  }

  onClick = (item, { x, y, width, height, pageX, pageY }) => {
    this.oldPosition.x = pageX
    this.oldPosition.y = pageY
    this.oldPosition.width = width
    this.oldPosition.height = height

    this.P.setValue({
      x: pageX,
      y: pageY,
    })
    this.D.setValue({
      x: width,
      y: height,
    })

    console.log('图片啊：', this.state.imageSrc, item)

    this.setState({ imageSrc: item }, () => {
      this.viewImage.measure((dx, dy, dwidth, dheight, dpageX, dpageY) => {
        Animated.parallel([
          Animated.timing(this.P.x, {
            toValue: dpageX,
            duration: 300,
          }),
          Animated.timing(this.P.y, {
            toValue: dpageY,
            duration: 300,
          }),
          Animated.timing(this.D.x, {
            toValue: dwidth,
            duration: 300,
          }),
          Animated.timing(this.D.y, {
            toValue: dheight,
            duration: 300,
          }),
          Animated.timing(this.contentValue, {
            toValue: HEIGHT,
            // duration: 300,
          }),
        ]).start(() => {
          Animated.parallel([
            Animated.spring(this.state.closeValue, {
              toValue: 1,
              friction: 2,
              tension: 10,
              easing: Easing.in,
            }),
          ]).start()
        })
      })
    })
  }

  close = () => {
    Animated.parallel([
      Animated.timing(this.state.closeValue, {
        toValue: 0,
        duration: 200,
      }),
      Animated.timing(this.contentValue, {
        toValue: 0,
        duration: 200,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(this.P.x, {
          toValue: this.oldPosition.x,
          duration: 300,
        }),
        Animated.timing(this.P.y, {
          toValue: this.oldPosition.y,
          duration: 300,
        }),
        Animated.timing(this.D.x, {
          toValue: this.oldPosition.width,
          duration: 300,
        }),
        Animated.timing(this.D.y, {
          toValue: this.oldPosition.height,
          duration: 300,
        }),
      ]).start(() => {
        this.setState({ imageSrc: null })
      })
    })
  }

  render() {
    const { imageSrc, closeValue } = this.state
    const activeImageStyle = {
      width: this.D.x,
      height: this.D.y,
      left: this.P.x,
      top: this.P.y,
    }

    const statuseBar = {
      hidden: !!imageSrc,
      animated: true,
      showHideTransition: 'slide',
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar {...statuseBar} />
        <ScrollView style={{ flex: 1 }}>
          {imgages.map(item => (
            <Item
              item={item}
              key={item.id}
              onClick={(v, imageWH) => this.onClick(v, imageWH)}
            />
          ))}
        </ScrollView>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={imageSrc ? 'auto' : 'none'}
        >
          <View
            style={{ flex: 2, zIndex: 1001 }}
            ref={v => (this.viewImage = v)}
          >
            <Animated.Image
              source={imageSrc || null}
              style={[
                {
                  resizeMode: 'cover',
                  top: 0,
                  left: 0,
                  height: null,
                  width: null,
                },
                { ...activeImageStyle },
              ]}
            />

            <TouchableWithoutFeedback onPress={this.close}>
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 30,
                  right: 30,
                  zIndex: 1002,
                  backgroundColor: '#D7DDDD',
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  transform: [{ scale: closeValue }],
                }}
              >
                <MaterialIcons
                  name="close"
                  size={26}
                  color="#fff"
                  style={{ textAlign: 'center', lineHeight: 30 }}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View
            style={{
              flex: 1,
              zIndex: 1000,
              backgroundColor: '#fff',
              position: 'absolute',
              height: this.contentValue,
              width: this.D.x,
              left: 0,
              top: this.contentValue,
              overflow: 'hidden',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                padding: 20,
              }}
            >
              女神镇楼
            </Text>
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 20,
              }}
            >
              痛苦往往来自于无法达成自己的期望。那么，你原本的期望是什么呢？
            </Text>
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 20,
              }}
            >
              凌晨三点半，才能写得出预期的东西，完美
            </Text>
          </Animated.View>
          <View style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    )
  }
}
