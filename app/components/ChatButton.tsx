import React from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface ChatButtonProps {
  onPress: () => void
}

const ChatButton: React.FC<ChatButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.chatBtn} onPress={onPress}>
        <Svg height="32" width="32" viewBox="0 0 1000 1000" fill="white">
          <Path d="M881.1,720.5H434.7L173.3,941V720.5h-54.4C58.8,720.5,10,671.1,10,610.2v-441C10,108.4,58.8,59,118.9,59h762.2C941.2,59,990,108.4,990,169.3v441C990,671.1,941.2,720.5,881.1,720.5L881.1,720.5z M935.6,169.3c0-30.4-24.4-55.2-54.5-55.2H118.9c-30.1,0-54.5,24.7-54.5,55.2v441c0,30.4,24.4,55.1,54.5,55.1h54.4h54.4v110.3l163.3-110.2H500h381.1c30.1,0,54.5-24.7,54.5-55.1V169.3L935.6,169.3z M717.8,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.5,24.7,54.5,55.2C772.2,420.2,747.8,444.8,717.8,444.8L717.8,444.8z M500,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.4,24.7,54.4,55.2C554.4,420.2,530.1,444.8,500,444.8L500,444.8z M282.2,444.8c-30.1,0-54.5-24.7-54.5-55.1c0-30.4,24.4-55.2,54.5-55.2c30.1,0,54.4,24.7,54.4,55.2C336.7,420.2,312.3,444.8,282.2,444.8L282.2,444.8z" />
        </Svg>
        <Text style={styles.tooltip}>Chat</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  chatBtn: {
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27.5,
    backgroundColor: '#FFE53B',
    backgroundImage: 'linear-gradient(147deg, #FFE53B, #FF2525, #FFE53B)',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  tooltip: {
    position: 'absolute',
    top: -40,
    opacity: 0,
    backgroundColor: 'rgb(255, 180, 82)',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
})

export default ChatButton 