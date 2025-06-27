import { RootStackParamList } from '@/app/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import CalendarComponent from './CalendarComponent';
import { Picker } from '@react-native-picker/picker';
import HorizontalCalendar from './HorizontalCalendar';
// import RewImage from '../assets/images/rew@4x.png';
import { Image } from 'expo-image';
import Footer from './Footer';


export default function Dashboard() {
    const route = useRoute();
    const { phone } = route.params as { phone: string };

    type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
    const navigation = useNavigation<LoginScreenNavigationProp>();


    const handleContinue = () => {
        navigation.navigate('PersonalInfo', { phone: `+${phone}` });
    };

    const handleSaveMore = () => {

    }


    return (
        <View style={styles.mainContainer}>
            {/* contains the header section */}
            <View style={styles.avtarContainer}>
                <Pressable onPress={handleContinue}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=20' }} // Replace with your image URI
                        style={styles.profileImage}
                    />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Hello,</Text>
                    <Text style={styles.nameText}>Aswathi</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <MaterialIcons name="notifications" size={24} color="#A44D44" />
                    {/* <Image source={require('./../assets/images/favicon.png')} style={{ width: 200, height: 200 }}/> */}
                    <MaterialIcons name="question-mark" size={24} color="#A44D44" />
                </View>
            </View>

            {/* contains the calendar section */}
            <View style={styles.middleContainer}>
                <HorizontalCalendar />
                {/* Your other content */}
                <TouchableOpacity style={styles.button} onPress={handleSaveMore}>
                    <Text style={styles.buttonText}>Save More</Text>
                </TouchableOpacity>
            </View>

            {/* contains the rewards section */}
            <View style={styles.extrasContainer}>
                <View style={styles.columnFlex}>

                    <Image source={require('@/assets/images/rewards.png')} style={styles.rewardsImage} />

                    <Text style={styles.titleText}>Rewards</Text>
                </View>
                <View style={styles.columnFlex}>
                    <Image source={require('@/assets/images/referral.png')} style={styles.referralImage} />

                    <Text style={styles.titleText}>Referral</Text>
                </View>


            </View>

            <View>
                <Footer />

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20,
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#ddd',
    },
    avtarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 8,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 24
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    textContainer: {
        flex: 3,
    },
    nameText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    middleContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    extrasContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    columnFlex: {
        flexDirection: 'column'
    },
    rewardsImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
        backgroundColor: '#720218'
    },
    referralImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
        backgroundColor: '#D3AF37'
    },
    button: {
        backgroundColor: '#A44D44',
        width: 250,
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});