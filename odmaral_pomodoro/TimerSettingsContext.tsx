import React, { createContext, useContext, useState, ReactNode } from "react";

export const MODES = {
  POMODORO: "pomodoro",
  SHORT_BREAK: "short_break",
  LONG_BREAK: "long_break",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];

type TimerSettingsContextType = {
  durations: Record<Mode, number>; // секундээр
  setDurations: React.Dispatch<React.SetStateAction<Record<Mode, number>>>;
};

const TimerSettingsContext = createContext<
  TimerSettingsContextType | undefined
>(undefined);

export const TimerSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [durations, setDurations] = useState<Record<Mode, number>>({
    pomodoro: 25 * 60,
    short_break: 5 * 60,
    long_break: 15 * 60,
  });

  return (
    <TimerSettingsContext.Provider value={{ durations, setDurations }}>
      {children}
    </TimerSettingsContext.Provider>
  );
};

export const useTimerSettings = () => {
  const ctx = useContext(TimerSettingsContext);
  if (!ctx) {
    throw new Error(
      "useTimerSettings must be used inside TimerSettingsProvider"
    );
  }
  return ctx;
};
