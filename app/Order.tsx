import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { router } from 'expo-router'
import { supabase } from '../lib/supabase'
import StyledForm from './components/StyledForm'

const regions = [
    'Chamarajanagar',
    'Madhur',
    'Karepta',
    'Mandya',
    'Hollesphure'
]

const qualityTypes = [
    'Select Quality',
    'Premium',
    'Standard',
    'Basic'
] as const

interface OrderForm {
    quantity: string
    quality: string
    loading_date: Date
    region: string
    description: string
}

export default function Order() {
    const [formData, setFormData] = useState<OrderForm>({
        quantity: '',
        quality: 'Select Quality',
        loading_date: new Date(Date.now() + 86400000), // Tomorrow
        region: 'Select Region',
        description: ''
    })
    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleDateChange = (_: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false)
        if (selectedDate) {
            setFormData(prev => ({ ...prev, loading_date: selectedDate }))
        }
    }

    const handleSubmit = async () => {
        try {
            if (formData.quality === 'Select Quality') {
                Alert.alert('Error', 'Please select a quality type.')
                return
            }

            if (formData.region === 'Select Region') {
                Alert.alert('Error', 'Please select a region.')
                return
            }

            if (!formData.quantity || isNaN(parseInt(formData.quantity))) {
                Alert.alert('Error', 'Please enter a valid quantity.')
                return
            }

            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error('No user found')

            const { error } = await supabase
                .from('rfqs')
                .insert([
                    {
                        buyer_id: user.id,
                        quantity: parseInt(formData.quantity),
                        quality: formData.quality,
                        loading_date: formData.loading_date.toISOString(),
                        region: formData.region,
                        description: formData.description
                    }
                ])
            if (error) throw error

            Alert.alert('Success', 'Order submitted successfully')
            router.back()
        } catch (error: any) {
            Alert.alert('Error', error.message)
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <StyledForm
                title="Create Order"
                subtitle="Please fill in the order details"
                onSubmit={handleSubmit}
                submitText="Submit Order"
            >
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChangeText={(value) => setFormData(prev => ({ ...prev, quantity: value }))}
                    keyboardType="numeric"
                />

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={formData.quality}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, quality: value }))}
                    >
                        {qualityTypes.map(quality => (
                            <Picker.Item key={quality} label={quality} value={quality} />
                        ))}
                    </Picker>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Loading Date"
                    value={formData.loading_date.toLocaleDateString()}
                    onPressIn={() => setShowDatePicker(true)}
                />

                {showDatePicker && (
                    <DateTimePicker
                        value={formData.loading_date}
                        mode="date"
                        minimumDate={new Date(Date.now() + 86400000)}
                        onChange={handleDateChange}
                    />
                )}

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={formData.region}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
                    >
                        <Picker.Item label="Select Region" value="Select Region" />
                        {regions.map(region => (
                            <Picker.Item key={region} label={region} value={region} />
                        ))}
                    </Picker>
                </View>

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Description"
                    value={formData.description}
                    onChangeText={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    multiline
                    numberOfLines={4}
                />
            </StyledForm>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 12,
        overflow: 'hidden',
    }
})