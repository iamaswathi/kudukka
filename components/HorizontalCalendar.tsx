import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VISIBLE_DAYS = 5;
const DAY_WIDTH = SCREEN_WIDTH / VISIBLE_DAYS;

const HorizontalCalendar = () => {
    // Current view state
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // UI state
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    // Generate all dates for current month/year
    const generateDates = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => new Date(currentYear, currentMonth, i + 1));
    };

    const [dates, setDates] = useState<Date[]>(generateDates());

    // Update dates when month/year changes
    useEffect(() => {
        setDates(generateDates());
    }, [currentMonth, currentYear]);

    // Scroll to selected date when dates change
    useEffect(() => {
        if (dates.length > 0 && scrollViewRef.current) {
            const selectedIndex = dates.findIndex(d =>
                d.toDateString() === selectedDate.toDateString()
            );

            if (selectedIndex >= 0) {
                setTimeout(() => {
                    scrollViewRef.current?.scrollTo({
                        x: (selectedIndex - Math.floor(VISIBLE_DAYS / 2)) * DAY_WIDTH,
                        animated: true
                    });
                }, 100);
            }
        }
    }, [dates]);

    // Month/year data
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

    const renderDate = (date: Date) => {
        const day = date.getDate();
        // const dayName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const isToday = date.toDateString() === new Date().toDateString();

        return (
            <TouchableOpacity
                key={date.toString()}
                onPress={() => setSelectedDate(date)}
                style={[
                    styles.dateContainer,
                    isSelected && styles.selectedDate,
                    isToday && styles.todayDate,
                    isToday && !isSelected && styles.todayNotSelected
                ]}
            >
                {/* <Text style={[styles.dayText, isSelected && styles.selectedText]}>
          {dayName}
        </Text> */}
                <Text style={[styles.dateText, isSelected && styles.selectedText]}>
                    {day}
                </Text>
                {isToday && !isSelected && (
                    <View style={styles.todayIndicator} />
                )}
                {!isToday && (
                    <View style={styles.theIndicator} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Month/Year Selectors */}
            <View style={styles.pickerRow}>


                <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => setShowYearPicker(!showYearPicker)}
                >
                    <Text style={styles.pickerText}>{currentYear}</Text>
                    <MaterialIcons
                        name={showYearPicker ? "arrow-drop-up" : "arrow-drop-down"}
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => setShowMonthPicker(!showMonthPicker)}
                >
                    <Text style={styles.pickerText}>{months[currentMonth].slice(0, 3)}</Text>
                    <MaterialIcons
                        name={showMonthPicker ? "arrow-drop-up" : "arrow-drop-down"}
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>

            {/* Month Picker */}
            {showMonthPicker && (
                <Picker
                    selectedValue={currentMonth}
                    onValueChange={(itemValue) => {
                        setCurrentMonth(itemValue);
                        setShowMonthPicker(false);
                    }}
                    style={styles.picker}
                >
                    {months.map((month, index) => (
                        <Picker.Item key={month} label={month} value={index} />
                    ))}
                </Picker>
            )}

            {/* Year Picker */}
            {showYearPicker && (
                <Picker
                    selectedValue={currentYear}
                    onValueChange={(itemValue) => {
                        setCurrentYear(itemValue);
                        setShowYearPicker(false);
                    }}
                    style={styles.picker}
                >
                    {years.map(year => (
                        <Picker.Item key={year} label={year.toString()} value={year} />
                    ))}
                </Picker>
            )}

            {/* Calendar Scroll View */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={DAY_WIDTH}
                decelerationRate="fast"
                contentContainerStyle={styles.datesContainer}
            >
                {dates.map(date => renderDate(date))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#fff',
        // borderRadius: 12,
        // padding: 16,
        // margin: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 6,
        // elevation: 3,
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#A44D44',
        borderRadius: 20,
        width: 80,
        marginLeft: 20
    },
    pickerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginRight: 5,
    },
    picker: {
        backgroundColor: '#A44D44',
        marginBottom: 12,
        borderRadius: 8,
        elevation: 3,
    },
    datesContainer: {
        paddingHorizontal: SCREEN_WIDTH / 2 - DAY_WIDTH / 2,
        marginBottom: 30
    },
    dateContainer: {
        width: DAY_WIDTH - 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginHorizontal: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderColor: '#ddd',
        borderWidth: 2
    },
    selectedDate: {
        borderColor: '#A44D44',
        borderWidth: 2,
        color: '#A44D44'
    },
    todayDate: {
        borderWidth: 2,
        borderColor: '#A44D44',
    },
    dayText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ddd',
    },
    selectedText: {
        color: '#A44D44'
    },
    todayIndicator: {
        width: 6,
        height: 6,
        borderRadius: 2,
        backgroundColor: '#A44D44',
        marginTop: 4,
        borderWidth: 0,
    },
    theIndicator: {
        width: 6,
        height: 6,
        borderRadius: 2,
        backgroundColor: '#fff',
        marginTop: 4,
        borderWidth: 0
    },
    todayNotSelected: {
        borderColor: '#ddd',
    }
});

export default HorizontalCalendar;