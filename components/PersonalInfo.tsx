import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types';

export default function PersonalInfo() {

    const route = useRoute();
    const { phone } = route.params as { phone: string };

    type PersonalInfoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PersonalInfo'>;
    const navigation = useNavigation<PersonalInfoNavigationProp>();
    const handleGoBack = () => {
        navigation.goBack();
    };
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
                <Text style={styles.info}>${phone}</Text>
                <Text style={styles.info}>aswathi@example.com</Text>
                <Text style={styles.info}>Female</Text>
            </View>
            <Pressable onPress={handleGoBack}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#A44D44" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
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