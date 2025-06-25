import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PersonalInfo() {
    return (
        <View style={styles.container}>
            <View style={styles.avtarContainer}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=20' }}
                    style={styles.avatar}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Personal Info</Text>
                <Text style={styles.info}>Aswathi Prakash</Text>
                <Text style={styles.info}>+61 412 345 678</Text>
                <Text style={styles.info}>aswathi@example.com</Text>
                <Text style={styles.info}>Female</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    infoContainer: {

    },
    avtarContainer: {

    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 20,
        marginTop: 50,
        marginBottom: 24
    },
    info: {
        fontSize: 16,
        marginBottom: 8,
        width: 350,
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        textAlign: 'left',
        padding: 12
    },
    title: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: 'bold',
    },
});