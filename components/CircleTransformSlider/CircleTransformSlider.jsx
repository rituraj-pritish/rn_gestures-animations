import React, { useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native'

const CircleTransformSlider = props => {
  const [index, setIndex] = useState(0)
  const animation = toValue =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false
    })
  const animatedValue = useRef(new Animated.Value(0)).current

  const inputRange = [0, 0.001, 0.5, 0.501, 1]

  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['gold', 'gold', 'gold', 'grey', 'grey']
  })

  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['grey', 'grey', 'grey', 'gold', 'gold']
  })

  const handlePress = () => {
    setIndex(index === 1 ? 0.01 : 1)
    animation(index === 1 ? 0.01 : 1).start()
  }

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.container, {
      backgroundColor: containerBg
    }]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: [
              {
                perspective: 400
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg']
                })
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1]
                })
              }
              // {
              //   translateX: animatedValue.interpolate({
              //     inputRange: [0, 0.5, 1],
              //     outputRange: ['0%', '50%', '0%']
              //   })
              // }
            ]
          }
        ]}
      >
        <TouchableOpacity style={styles.circle} onPress={handlePress} />
      </Animated.View>
    </Animated.View>
  )
}

const CIRCLE_SIZE = 100

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'gold'
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    // backgroundColor: 'grey',
    borderRadius: CIRCLE_SIZE,
    marginBottom: CIRCLE_SIZE
  }
})

export default CircleTransformSlider
