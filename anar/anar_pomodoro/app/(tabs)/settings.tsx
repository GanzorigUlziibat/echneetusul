// app/(tabs)/settings.tsx

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { usePomodoro } from '../context'; // 👈 Context-ээс hook-ийг импортлов

const SettingsScreen = () => {
    // Context-ээс шаардлагатай утгуудыг авна
    const {
        focusDuration,
        breakDuration,
        isRunning, 
        adjustDuration, 
        MIN_DURATION, 
        MAX_DURATION,
    } = usePomodoro();

    const renderDurationControl = (mode: 'Анхаарал' | 'Завсарлага', duration: number): JSX.Element => (
        <View style={settingsStyles.settingControl}>
            <Text style={settingsStyles.settingLabel}>{mode === 'Анхаарал' ? 'Анхаарал Хугацаа' : 'Завсарлагын Хугацаа'}</Text>
            <View style={settingsStyles.settingButtons}>
                {/* Хасах Товч */}
                <TouchableOpacity 
                    style={settingsStyles.adjustButton} 
                    onPress={() => adjustDuration(mode, -1)}
                    disabled={isRunning || duration <= MIN_DURATION}
                >
                    <AntDesign name="minuscircleo" size={30} color={isRunning ? 'gray' : '#333'} />
                </TouchableOpacity>
                
                <Text style={settingsStyles.settingValue}>{duration} мин</Text>
                
                {/* Нэмэх Товч */}
                <TouchableOpacity 
                    style={settingsStyles.adjustButton} 
                    onPress={() => adjustDuration(mode, 1)}
                    disabled={isRunning || duration >= MAX_DURATION}
                >
                    <AntDesign name="pluscircleo" size={30} color={isRunning ? 'gray' : '#333'} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={settingsStyles.container}>
            <Text style={settingsStyles.headerText}>Цагны Тохиргоо</Text>
            
            {renderDurationControl('Анхаарал', focusDuration)}
            {renderDurationControl('Завсарлага', breakDuration)}
            
            {isRunning && (
                <Text style={settingsStyles.noteText}>
                    Цаг ажиллаж байх үед тохиргоо хийх боломжгүй.
                </Text>
            )}
        </View>
    );
};

const settingsStyles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', },
    headerText: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#333', },
    settingControl: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15, padding: 10, backgroundColor: '#fff', borderRadius: 8, elevation: 2, },
    settingLabel: { fontSize: 18, color: '#333', fontWeight: '600', },
    settingButtons: { flexDirection: 'row', alignItems: 'center', },
    adjustButton: { paddingHorizontal: 10, },
    settingValue: { fontSize: 22, fontWeight: 'bold', color: '#333', marginHorizontal: 15, minWidth: 70, textAlign: 'center', },
    noteText: { marginTop: 30, textAlign: 'center', color: '#D34848', fontSize: 16, fontStyle: 'italic', },
});

export default SettingsScreen;