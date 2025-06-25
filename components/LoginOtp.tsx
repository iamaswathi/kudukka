import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TextInput as RNTextInput, ActivityIndicator, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/types";
import maskPhoneNumber from "@/app/utils";
import { Ionicons } from "@expo/vector-icons";

export default function LoginOtp() {

    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const inputs = useRef<(RNTextInput | null)[]>(Array(6).fill(null));
    const [isVeryfying, setIsVerifying] = useState(false);

    const route = useRoute();
    const { phone } = route.params as { phone: string };

    type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginOtp'>;
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto focus to next input
        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }

        // Auto submit when last digit is entered
        if (index === 5 && text) {
            Keyboard.dismiss();
            handleVerify();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        setIsVerifying(true);
        const enteredOtp = otp.join('');
        try {
            await verifyOtp(enteredOtp);
            console.log('OTP verified');
            navigation.navigate('PersonalInfo');
        } catch (error) {
            console.error('OTP verification failed', error);
            Alert.alert("Invalid OTP, please try again.");
            setOtp(Array(6).fill(''));
            inputs.current[0]?.focus();
        } finally {
            setIsVerifying(false);
        }
        // if (enteredOtp === '123456') {
        //     navigation.navigate('PersonalInfo');
        // } else {
        //     return;
        // }
    };

    const verifyOtp = async (otp: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (otp === '123456') {
                    resolve();
                } else {
                    reject(new Error('Invalid OTP'));
                }
            }, 1500);
        });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const maskedPhoneNumber = maskPhoneNumber(phone, 'x', 3);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter the 6-digit code we texted to {maskedPhoneNumber}</Text>
            <Text style={styles.subText}>This helps us keep your account secure by verifying that it's really you.</Text>

            <View style={styles.otpContainer}>
                {Array(6).fill(0).map((_, index) => (
                    <TextInput key={index}
                        style={styles.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={otp[index]}
                        onChangeText={(text: string) => handleChange(text, index)}
                        onKeyPress={(e: any) => handleKeyPress(e, index)}
                        ref={(ref: RNTextInput | null) => {
                            if (inputs.current) {
                                inputs.current[index] = ref;
                            }
                        }}
                        autoFocus={index === 0}
                        editable={!isVeryfying}
                    />
                ))}
            </View>
            {isVeryfying && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6200ee" />
                    <Text style={styles.loadingText}>Verifying OTP ...</Text>
                </View>
            )}


            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive code?</Text>
                <TouchableOpacity>
                    <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Text style={styles.backText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 0.5,
        justifyContent: 'center',
        marginTop: 50
    },
    title: {
        fontSize: 20,
        marginBottom: 24
    },
    subText: {
        fontSize: 16,
        marginBottom: 24
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 24,
        height: 44,
        fontSize: 18,
        textAlign: 'center',
    },
    loadingContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    loadingText: {
        marginTop: 10,
        color: '#6200ee',
    },
    button: {
        backgroundColor: '#A44D44',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        opacity: 1,
        marginBottom: 24,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
    },
    resendText: {
        color: '#666',
        marginRight: 5,
    },
    resendLink: {
        color: '#4A786B',
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#F4E3CF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        opacity: 1,
    },
    backText: {
        color: '#666',
        fontWeight: 'bold',
    }
});