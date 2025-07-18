import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // ✅ Import Ionicons from Expo

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fadeIn = useSharedValue(0);
  const slideY = useSharedValue(20);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 500 });
    slideY.value = withTiming(0, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideY.value }],
  }));

  const handleReset = () => {
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1 px-6"
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center mt-4 mb-2"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View className="flex-1 justify-center">
          
          <Animated.View style={animatedStyle} className="mb-10">
            <Text className="text-textPrimary text-3xl font-bold mb-2">
              Forgot Password
            </Text>
            <Text className="text-textSecondary">
              Please enter your email address to receive a reset link.
            </Text>
          </Animated.View>

          {!submitted ? (
            <>
              <TextInput
                placeholder="Email"
                placeholderTextColor={Colors.gray}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                className="bg-offwhite text-background p-4 rounded-xl mb-6"
              />

              <TouchableOpacity
                onPress={handleReset}
                className="bg-primary p-4 rounded-xl items-center"
              >
                <Text className="text-background font-semibold">
                  Receive Link
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Animated.View
              style={animatedStyle}
              className="bg-primary p-4 rounded-xl"
            >
              <Text className="text-white font-semibold text-center">
                OTP code has been sent, Check your email.
              </Text>
            </Animated.View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
