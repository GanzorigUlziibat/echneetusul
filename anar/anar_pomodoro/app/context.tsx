// app/context.tsx

import React, { createContext, useContext } from 'react';

// Горимын төрөл
type PomodoroMode = 'Анхаарал' | 'Богино Завсарлага';

// Context-ээр дамжуулагдах бүх утгуудын төрлийг тодорхойлно
interface PomodoroContextType {
    timeRemaining: number;
    currentMode: PomodoroMode;
    isRunning: boolean;
    formatTime: string;
    handleStartPause: () => void;
    handleReset: () => void;
    focusDuration: number;
    breakDuration: number;
    adjustDuration: (mode: 'Анхаарал' | 'Завсарлага', value: number) => void;
    MIN_DURATION: number;
    MAX_DURATION: number;
}

// Context объектыг үүсгэх
const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

// Custom Hook: Context-ийг бусад компонент руу дамжуулах функц
export const usePomodoro = () => {
    const context = useContext(PomodoroContext);
    
    // Хэрэв Provider-гүйгээр дуудсан бол алдаа мэдэгдэнэ
    if (context === undefined) {
        throw new Error('usePomodoro-г Pomodoro Provider-ийн дотор ашиглах ёстой.');
    }
    return context;
};

// Provider-т ашиглагдах Context-ийг export хийх
export default PomodoroContext;