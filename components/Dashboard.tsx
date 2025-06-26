import { RootStackParamList } from '@/app/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import CalendarComponent from './CalendarComponent';
import { Picker } from '@react-native-picker/picker';
import HorizontalCalendar from './HorizontalCalendar';

export default function Dashboard() {
    const route = useRoute();
    const { phone } = route.params as { phone: string };

    type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
    const navigation = useNavigation<LoginScreenNavigationProp>();


    const handleContinue = () => {
        navigation.navigate('PersonalInfo', { phone: `+${phone}` });
    };


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
            <View >
                <HorizontalCalendar />
                {/* Your other content */}
            </View>

            {/* contains the rewards section */}
            <View style={styles.extrasContainer}>
                <View style={styles.columnFlex}>
                    <Image source={{ uri: 'https://i.pravatar.cc/150?img=20' }} style={styles.profileImage}
                    />
                    <Text style={styles.titleText}>Rewards</Text>
                </View>
                <View style={styles.columnFlex}>
                    <Image source={{ uri: 'https://i.pravatar.cc/150?img=20' }} style={styles.profileImage}
                    />
                    <Text style={styles.titleText}>Referral</Text>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 10,
        paddingTop: 35,
        // alignItems: 'center',
        flex: 1,
        backgroundColor: '#ddd',
    },
    avtarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 8,
        margin: 10
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
    extrasContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    columnFlex: {
        flexDirection: 'column'
    }, button: {
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