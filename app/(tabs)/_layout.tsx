import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Platform, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import AuthProvider from "@/context/AuthContext";

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
  focused?: boolean;
};

const TabIcon = ({ name, color, size = 24, focused }: TabIconProps) => {
  return (
    <View
      className={`items-center justify-center ${
        focused ? "transform scale-110" : ""
      }`}
    >
      <Ionicons
        name={name}
        size={size}
        color={color}
        style={{
          marginBottom: 2,
          shadowColor: focused ? Colors.primary : "transparent",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: focused ? 0.8 : 0,
          shadowRadius: focused ? 8 : 0,
        }}
      />
    </View>
  );
};

const TabBarLabel = ({
  focused,
  children,
}: {
  focused: boolean;
  children: string;
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Text
      className={`text-xs font-medium ${
        focused ? "text-[#00C3FF]" : isDark ? "text-white/70" : "text-gray-600"
      }`}
      style={{
        textShadowColor: focused ? Colors.primary : "transparent",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: focused ? 4 : 0,
      }}
    >
      {children}
    </Text>
  );
};

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <AuthProvider>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? Colors.background : Colors.white,
          borderTopWidth: 1,
          borderTopColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : Colors.lightGray,
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 10,
          elevation: 10,
          shadowColor: isDark ? Colors.primary : Colors.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: isDark ? 0.2 : 0.1,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: isDark ? Colors.textSecondary : Colors.gray,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "compass" : "compass-outline"}
              color={color}
              focused={focused}
              size={26}
            />
          ),
          tabBarLabel: ({ focused, children }) => (
            <TabBarLabel focused={focused}>{children}</TabBarLabel>
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              focused={focused}
              size={26}
            />
          ),
          tabBarLabel: ({ focused, children }) => (
            <TabBarLabel focused={focused}>{children}</TabBarLabel>
          ),
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-14 h-14 rounded-2xl items-center justify-center ${
                focused ? "bg-gradient-to-r from-[#00C3FF] to-[#FF2DAF]" : ""
              }`}
              style={{
                backgroundColor: focused
                  ? undefined
                  : isDark
                  ? Colors.darkLight
                  : Colors.deepLight,
                borderWidth: focused ? 0 : 2,
                borderColor: focused ? "transparent" : Colors.primary,
                shadowColor: focused ? Colors.highlight : "transparent",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: focused ? 0.6 : 0,
                shadowRadius: focused ? 12 : 0,
                elevation: focused ? 8 : 2,
              }}
            >
              <Ionicons
                name="add"
                size={32}
                color={focused ? Colors.white : Colors.primary}
                style={{
                  fontWeight: "bold",
                }}
              />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              focused={focused}
              size={26}
            />
          ),
          tabBarLabel: ({ focused, children }) => (
            <TabBarLabel focused={focused}>{children}</TabBarLabel>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              focused={focused}
              size={26}
            />
          ),
          tabBarLabel: ({ focused, children }) => (
            <TabBarLabel focused={focused}>{children}</TabBarLabel>
          ),
        }}
      />
    </Tabs>
    </AuthProvider>
  );
}
