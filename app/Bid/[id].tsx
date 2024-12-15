import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface BidDetails {
    id: string
    price: number
    rfq_id: string
    created_at: string
    status: string
    rfqs: {
        quantity: number
        quality: string
        loading_date: string
        region: string
        description: string
    }
}

export default function BidDetail() {
    const { id } = useLocalSearchParams()
    const [bid, setBid] = useState<BidDetails | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBidDetails()
    }, [id])

    async function fetchBidDetails() {
        try {
            const { data, error } = await supabase
                .from('bids')
                .select(`
                    *,
                    rfqs (
                        quantity,
                        quality,
                        loading_date,
                        region,
                        description
                    )
                `)
                .eq('id', id)
                .single()

            if (error) throw error
            setBid(data)
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleStatusChange(newStatus: string) {
        try {
            const { error } = await supabase
                .from('bids')
                .update({ status: newStatus })
                .eq('id', id)

            if (error) throw error
            setBid(bid => bid ? { ...bid, status: newStatus } : null)
            Alert.alert('Success', `Status updated to ${newStatus}`)
        } catch (error: any) {
            Alert.alert('Error', error.message)
        }
    }

    if (loading) return <Text>Loading...</Text>

    if (!bid) return <Text>Bid not found</Text>

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Bid Details</Text>

                <Text style={styles.label}>Bid ID:</Text>
                <Text style={styles.value}>{bid.id}</Text>

                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>₹{bid.price}</Text>

                <Text style={styles.label}>Created At:</Text>
                <Text style={styles.value}>{new Date(bid.created_at).toLocaleDateString()}</Text>

                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{bid.status}</Text>

                {bid.status === 'pending' && (
                    <View style={styles.buttonContainer}>
                        <Pressable 
                            style={[styles.button, styles.approveButton]}
                            onPress={() => handleStatusChange('approved')}
                        >
                            <Text style={styles.buttonText}>Approve</Text>
                        </Pressable>

                        <Pressable 
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => handleStatusChange('rejected')}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </Pressable>

                        <Pressable 
                            style={[styles.button, styles.counterButton]}
                            onPress={() => handleStatusChange('countered')}
                        >
                            <Text style={styles.buttonText}>Counter</Text>
                        </Pressable>
                    </View>
                )}

                <Text style={styles.subtitle}>RFQ Details</Text>

                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.value}>{bid.rfqs.quantity}</Text>

                <Text style={styles.label}>Quality:</Text>
                <Text style={styles.value}>{bid.rfqs.quality}</Text>

                <Text style={styles.label}>Loading Date:</Text>
                <Text style={styles.value}>
                    {new Date(bid.rfqs.loading_date).toLocaleDateString()}
                </Text>

                <Text style={styles.label}>Region:</Text>
                <Text style={styles.value}>{bid.rfqs.region}</Text>

                <Text style={styles.label}>Description:</Text>
                <Text style={styles.value}>{bid.rfqs.description}</Text>
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#666',
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    approveButton: {
        backgroundColor: '#4CAF50',
    },
    rejectButton: {
        backgroundColor: '#f44336',
    },
    counterButton: {
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})
