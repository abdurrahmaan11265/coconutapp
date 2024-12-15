import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileCardProps {
    name: string;
    phone: string;
    email: string;
    location: string;
    businessName: string;
    gstno: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, phone, email, location, businessName, gstno }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Profile Card</Text>
            <View style={styles.cardInfo}>
                <Text style={styles.infoText}>Name: {name}</Text>
                <Text style={styles.infoText}>Phone: {phone}</Text>
                <Text style={styles.infoText}>Email: {email}</Text>
                <Text style={styles.infoText}>Location: {location}</Text>
                <Text style={styles.infoText}>Business Name: {businessName}</Text>
                <Text style={styles.infoText}>GST Number: {gstno}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    cardInfo: {
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ProfileCard;