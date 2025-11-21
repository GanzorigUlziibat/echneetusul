import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TimerSettingsProvider } from "../../TimerSettingsContext";

export default function TabsLayout() {
  return (
    <TimerSettingsProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#9ca3af",
          headerShown: false,
        }}
      >
        {/* ---------------- Timer Tab ---------------- */}
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

        {/* ---------------- Settings Tab ---------------- */}
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />

        {/* ---------------- Weather Tab ---------------- */}
        <Tabs.Screen
          name="weather"
          options={{
            title: "Weather",
            tabBarLabel: "Weather",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </TimerSettingsProvider>
  );
}
