import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log('Login attempted with:', email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center items-center px-[20px] bg-background"
    >
      {/* Logo */}
      <View className="w-[100px] h-[30px] items-center justify-center mb-[?px]">
        <Image
          className="w-[100px] h-[30px]"
          source={require('@/assets/images/yuno-full-wordmark.png')}
        />
      </View>

      {/* Form Container */}
      <View className="bg-background rounded-[25px] p-[30px]">
        {/* Header */}
        <Text className="text-[32px] font-[700] text-textSecondary mb-[8px]">
          Welcome Back
        </Text>
        <Text
          // Since rgba(255,255,255,0.7) may not be a registered color in your config,
          // ensure your Tailwind config defines it or use an inline style instead.
          className="text-[16px] mb-[40px]"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          Sign in to continue
        </Text>

        {/* Email Input */}
        <View className="flex-row items-center bg-offwhite rounded-[15px] h-[60px] px-[20px] mb-[20px] border border-gray">
          <Ionicons name="mail-outline" size={20} color={Colors.background} />
          <TextInput
            className="flex-1 ml-[12px] text-[16px] text-background"
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-offwhite rounded-[15px] h-[60px] px-[20px] mb-[20px] border border-[rgba(255,255,255,0.1)]">
          <Ionicons name="lock-closed-outline" size={20} color={Colors.background} />
          <TextInput
            className="flex-1 ml-[12px] text-[16px] text-background"
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="p-[8px]"
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={Colors.background}
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => router.push('/forgot-password')}
          className="self-end"
        >
          <Text className="text-[14px] text-textSecondary">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity onPress={handleLogin} className="mb-[30px]">
          <Text className="text-[18px] font-[600] text-primary">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-[14px] text-textPrimary">
            Don't have an account?{' '} 
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text className="text-[14px] font-[600] text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;