import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { supabase } from '../lib/supabase'
import StyledForm, { StyledInput } from './components/StyledForm'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  async function handleAuth() {
    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/BuyerHome')
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        router.push('/Register')
      }
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <StyledForm
        title={isLogin ? "Login" : "Sign up"}
        subtitle={isLogin ? "Welcome back!" : "Create a free account with your email."}
        onSubmit={handleAuth}
        submitText={isLogin ? "Login" : "Sign up"}
        footer={
          <Pressable onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.footerText}>
              {isLogin ? "Need to create account? " : "Already have an account? "}
              <Text style={styles.footerLink}>
                {isLogin ? "Sign up" : "Login"}
              </Text>
            </Text>
          </Pressable>
        }
      >
        <TextInput
          style={StyledInput.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={StyledInput.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {!isLogin && (
          <TextInput
            style={StyledInput.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}
      </StyledForm>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footerLink: {
    color: '#0066ff',
    fontWeight: 'bold',
  },
})