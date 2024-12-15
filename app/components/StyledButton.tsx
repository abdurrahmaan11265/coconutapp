import React from 'react'
import { Pressable, Text, Animated, StyleSheet, View } from 'react-native'
import { Svg, Path } from 'react-native-svg'

interface StyledButtonProps {
  title: string
  onPress: () => void
}

export default function StyledButton({ title, onPress }: StyledButtonProps) {
  const animatedWidth = new Animated.Value(44) // 2.2em -> 44
  const iconTranslateX = new Animated.Value(0)

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(animatedWidth, {
        toValue: 70, // calc(100% - 0.6em)
        useNativeDriver: false,
      }),
      Animated.spring(iconTranslateX, {
        toValue: 10,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(animatedWidth, {
        toValue: 44,
        useNativeDriver: false,
      }),
      Animated.spring(iconTranslateX, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start()
  }

  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={styles.text}>{title}</Text>
      <Animated.View style={[styles.icon, { width: animatedWidth }]}>
        <Animated.View style={{ transform: [{ translateX: iconTranslateX }] }}>
          <Svg height={24} width={24} viewBox="0 0 24 24">
            <Path d="M0 0h24v24H0z" fill="none" />
            <Path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="#7b52b9"
            />
          </Svg>
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#a370f0',
    paddingVertical: 7,
    paddingLeft: 24,
    paddingRight: 66,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    position: 'relative',
    shadowColor: '#714da6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  icon: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 6,
    height: 44,
    width: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7b52b9',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
}) 