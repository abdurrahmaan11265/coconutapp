import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'

interface StyledFormProps {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
  onSubmit: () => void
  submitText: string
}

export default function StyledForm({ 
  title, 
  subtitle, 
  children, 
  footer,
  onSubmit,
  submitText 
}: StyledFormProps) {
  return (
    <View style={styles.formBox}>
      <View style={styles.form}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        
        <View style={styles.formContainer}>
          {children}
        </View>

        <Pressable 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>{submitText}</Text>
        </Pressable>
      </View>

      {footer && (
        <View style={styles.formSection}>
          {footer}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  formBox: {
    maxWidth: 350,
    width: '100%',
    backgroundColor: '#f1f7fe',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  form: {
    padding: 24,
    gap: 16,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#010101',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    marginVertical: 16,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#0066ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#005ce6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  formSection: {
    padding: 16,
    backgroundColor: '#e0ecfb',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
  },
})

export const StyledInput = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 14,
    paddingHorizontal: 15,
  }
}) 