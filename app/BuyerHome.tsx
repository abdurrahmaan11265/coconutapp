import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { router } from 'expo-router'
import ProfileCard from './components/ProfileCard'
import StyledButton from './components/StyledButton'

interface BuyerProfile {
  id: string
  name: string
  phone: string
  email: string
  location: string
  business_name: string
  gstno: string
}

export default function BuyerHome() {
  const [profile, setProfile] = useState<BuyerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [bids, setBids] = useState<any[]>([])

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    if (profile) {
      fetchBids()
    }
  }, [profile])

  async function getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/')
        return
      }

      const { data, error } = await supabase
        .from('buyers')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          router.replace('/Register')
          return
        }
        throw error
      }

      setProfile(data)
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  async function fetchBids() {
    try {
      if (!profile) return;

      const { data, error } = await supabase
        .from('bids')
        .select(`
          id,
          price,
          rfqs (
            buyer_id
          )
        `)
        .eq('rfqs.buyer_id', profile.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBids(data || [])
    } catch (error: any) {
      console.error('Bid fetch error:', error)
      Alert.alert('Error', error.message)
    }
  }

  if (loading) return <Text>Loading...</Text>

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profile && (
        <>
          <ProfileCard
            name={profile.name}
            phone={profile.phone}
            email={profile.email}
            location={profile.location}
            businessName={profile.business_name}
            gstno={profile.gstno}
          />
          <View style={styles.buttonContainer}>
            <StyledButton
              title="Order"
              onPress={() => router.push('/Order')}
            />
          </View>
          <View style={styles.bidsContainer}>
            <Text>Bids ({bids.length})</Text>
            {bids.map((bid) => (
              <Pressable
                key={bid.id}
                style={styles.bidCard}
                onPress={() => router.push({
                  pathname: "/Bid/[id]",
                  params: { id: bid.id }
                })}
              >
                <Text>Bid ID: {bid.id}</Text>
                <Text>Price: ₹{bid.price}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  bidsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  bidCard: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
})