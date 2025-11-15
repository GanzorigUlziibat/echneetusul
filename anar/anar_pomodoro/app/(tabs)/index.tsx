// app/(tabs)/_layout.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { Tabs } from 'expo-router'; 
import { SafeAreaView, StatusBar, Alert } from 'react-native';
import { Audio } from 'expo-av'; 
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import PomodoroContext from '../context'; // 👈 Context-ийг импортлов

// --- CONSTANTS ---
const INITIAL_FOCUS_MINUTES = 25; 
const INITIAL_BREAK_MINUTES = 5; 
const MIN_DURATION = 1; 
const MAX_DURATION = 60; 
const ALARM_SOUND = require('../../assets/sounds/alarm.mp3'); 

type PomodoroMode = 'Анхаарал' | 'Богино Завсарлага';

export default function TabLayout() {
    // --- ТӨЛӨВҮҮД (STATES) ---
    const [focusDuration, setFocusDuration] = useState<number>(INITIAL_FOCUS_MINUTES);
    const [breakDuration, setBreakDuration] = useState<number>(INITIAL_BREAK_MINUTES);
    const [currentMode, setCurrentMode] = useState<PomodoroMode>('Анхаарал');
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number>(INITIAL_FOCUS_MINUTES * 60);

    // --- A. Дууны Логик ---
    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(ALARM_SOUND);
            setSound(sound);
        };
        loadSound();
        return () => {
            if (sound) { sound.unloadAsync(); }
        };
    }, []); 
    const playSound = async () => { if (sound) { await sound.setPositionAsync(0); await sound.playAsync(); } };
    const stopSound = async () => { if (sound) { await sound.stopAsync(); } };

    // --- B. Цагны Логик ---
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => { setTimeRemaining(prevTime => prevTime - 1); }, 1000);
        } else if (timeRemaining === 0) {
            setIsRunning(false);
            playSound(); 
            Alert.alert(
                `${currentMode} дууслаа!`, 
                'Дараагийн горим руу шилжиж байна.',
                [{ text: 'Зүгээр', onPress: () => { stopSound(); handleModeSwitch(); } }],
                { cancelable: false }
            );
        }
        return () => { if (interval) { clearInterval(interval); } };
    }, [isRunning, timeRemaining, currentMode, sound]);

    // --- C. Удирдлагын Функцууд ---
    const handleStartPause = (): void => { setIsRunning(prevIsRunning => !prevIsRunning); };
    const handleReset = (): void => {
        setIsRunning(false);
        const currentDuration = currentMode === 'Анхаарал' ? focusDuration : breakDuration;
        setTimeRemaining(currentDuration * 60);
    };
    const handleModeSwitch = (modeOverride: PomodoroMode | null = null): void => {
        const nextMode: PomodoroMode = modeOverride || (currentMode === 'Анхаарал' ? 'Богино Завсарлага' : 'Анхаарал');
        setCurrentMode(nextMode);
        setIsRunning(false); 
        const nextDuration = nextMode === 'Анхаарал' ? focusDuration : breakDuration;
        setTimeRemaining(nextDuration * 60);
    };

    // --- D. Тохиргоог Өөрчлөх Функц ---
    const adjustDuration = (mode: 'Анхаарал' | 'Завсарлага', value: number): void => {
        if (isRunning) return;
        if (mode === 'Анхаарал') {
            setFocusDuration(prev => {
                const newDuration = Math.min(Math.max(prev + value, MIN_DURATION), MAX_DURATION);
                if (currentMode === 'Анхаарал') { setTimeRemaining(newDuration * 60); }
                return newDuration;
            });
        } else {
            setBreakDuration(prev => {
                const newDuration = Math.min(Math.max(prev + value, MIN_DURATION), MAX_DURATION);
                if (currentMode === 'Богино Завсарлага') { setTimeRemaining(newDuration * 60); }
                return newDuration;
            });
        }
    };

    // --- E. Цаг Хөрвүүлэлт ---
    const formatTime: string = useMemo(() => {
        const minutes: number = Math.floor(timeRemaining / 60);
        const seconds: number = timeRemaining % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, [timeRemaining]);
    
    // Context-ээр дамжуулах бүх утгуудыг нэгтгэх
    const contextValue: PomodoroContextType = {
        timeRemaining, currentMode, isRunning, formatTime, 
        handleStartPause, handleReset, focusDuration, 
        breakDuration, adjustDuration, MIN_DURATION, MAX_DURATION,
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentMode === 'Анхаарал' ? '#D34848' : '#48A8D3' }}>
            <StatusBar barStyle="light-content" />
            
            {/* Context Provider-ээр Tabs Navigator-ийг бүрхүүлнэ */}
            <PomodoroContext.Provider value={contextValue}>
                <Tabs
                    screenOptions={{
                        headerShown: false, // Header-ийг нуух
                        tabBarActiveTintColor: currentMode === 'Анхаарал' ? '#D34848' : '#48A8D3',
                        tabBarInactiveTintColor: 'gray',
                    }}
                >
                    <Tabs.Screen 
                        name="index" 
                        options={{
                            title: 'Цаг',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="timer" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tabs.Screen 
                        name="settings"
                        options={{
                            title: 'Тохиргоо',
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="setting" color={color} size={size} />
                            ),
                        }}
                    />
                </Tabs>
            </PomodoroContext.Provider>
        </SafeAreaView>
    );
}