import { View, TextInput, Button, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { supabase } from '../lib/supabase'

export default function Register() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [gstno, setGstno] = useState('') // Added state for GST number
    const [location, setLocation] = useState('') // Added state for location
    const [businessName, setBusinessName] = useState('') // Added state for business name

    async function handleRegister() {
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error('No user found')

            const { error } = await supabase
                .from('buyers')
                .insert([
                    {
                        user_id: user.id,
                        name,
                        phone,
                        email: user.email,
                        gstno, // Added GST number to the database insert
                        location, // Added location to the database insert
                        business_name: businessName, // Added business name to the database insert
                    }
                ])

            if (error) throw error

            router.push('/BuyerHome')
        } catch (error: any) {
            Alert.alert('Error', error.message)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="GST Number"
                value={gstno}
                onChangeText={setGstno}
            />

            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />

            <TextInput
                style={styles.input}
                placeholder="Business Name"
                value={businessName}
                onChangeText={setBusinessName}
            />

            <Button title="Complete Registration" onPress={handleRegister} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 12,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
})

