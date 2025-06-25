import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types';

export default function Login() {

    const [countryCode, setCountryCode] = useState<Country['cca2']>('IN');
    const [callingCode, setCallingCode] = useState<string>('91');
    const [phoneNumber, setPhoneNumber] = useState('');
    type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const handleContinue = () => {
        if (phoneNumber.length >= 6) {
            navigation.navigate('LoginOtp', { phone: `+${callingCode}${phoneNumber}` });
        } else {
            alert('Please enter a valid phone number');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Let's get started!</Text>
            <Text style={styles.subText}>Enter your mobile number and we will send you a confirmation code there.</Text>
            <View style={styles.phoneContainer}>
                <CountryPicker
                    countryCode={countryCode}
                    withCallingCode
                    withFilter
                    withFlag
                    withCountryNameButton
                    onSelect={(country: Country) => {
                        setCountryCode(country.cca2); // 'IN', 'US', etc.
                        setCallingCode(country.callingCode[0]); // e.g., '91'
                    }}
                />
                <Text style={styles.code}>+{callingCode}</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholder="Enter number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { padding: 24, flex: 0.5, justifyContent: 'center', fontFamily: 'Arial' },
    label: { fontSize: 28, marginBottom: 12, fontWeight: 'bold'},
    subText: { fontSize: 16, },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1, borderColor: '#ccc',
        borderRadius: 8, paddingHorizontal: 12, marginBottom: 24, marginTop:60,
    },
    code: { marginHorizontal: 8 },
    input: { flex: 1, height: 40 },
    button: {
        backgroundColor: '#A44D44',
        padding: 16, borderRadius: 8, alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});