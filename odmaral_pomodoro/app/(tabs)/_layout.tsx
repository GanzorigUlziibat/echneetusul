import { Tabs } from "expo-router";
import React from "react";
import { TimerSettingsProvider } from "../../TimerSettingsContext";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <TimerSettingsProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Timer",
            tabBarLabel: "Timer",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </TimerSettingsProvider>
  );
}
