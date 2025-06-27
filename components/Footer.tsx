import { View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';

import { Image } from 'expo-image';
export default function Footer() {
    return (
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
    );
}

const styles = StyleSheet.create({
    extrasContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#A44D44',
        borderRadius: 20,
        padding: 20,
        color: '#fff'
    },
    columnFlex: {
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
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