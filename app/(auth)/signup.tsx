import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = () => {
    if(password1===password2){
    console.log('SignUp attempted with:', email, password1);}
    else{
      console.log("Passwords do not match")
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center items-center px-[20px] bg-background"
    >
      {/* Logo */}
      <ScrollView className='flex' showsVerticalScrollIndicator={false}>
      {/* Form Container */}
      <View className="bg-background rounded-[25px] p-[30px]">
        {/* Header */}
        <Text className="text-[32px] font-[700] text-textSecondary mb-[8px]">
          Hi there! 👋
        </Text>
        <Text
          // Since rgba(255,255,255,0.7) may not be a registered color in your config,
          // ensure your Tailwind config defines it or use an inline style instead.
          className="text-[16px] mb-[40px] text-textSecondary"
        >
          Sign Up to continue
        </Text>

        {/* Email Input */}
        <View className="flex-row items-center bg-offwhite rounded-[15px] h-[60px] px-[20px] mb-[20px] border border-[rgba(255,255,255,0.1)]">
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
         <View className="flex-row items-center bg-offwhite rounded-[15px] h-[60px] px-[20px] mb-[20px] border border-[rgba(255,255,255,0.1)]">
          <Ionicons name="person" size={20} color={Colors.background} />
          <TextInput
            className="flex-1 ml-[12px] text-[16px] text-background"
            placeholder="Username"
            placeholderTextColor={Colors.gray}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>


        {/* Password Input */}
        <View className="flex-row items-center bg-offwhite rounded-[15px] h-[60px] px-[20px] mb-[20px] border border-gray">
          <Ionicons name="lock-closed-outline" size={20} color={Colors.background} />
          <TextInput
            className="flex-1 ml-[12px] text-[16px] text-background"
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            value={password1}
            onChangeText={setPassword1}
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

<View className="flex-row items-center bg-offwhite rounded-[15px] h-[60px] px-[20px] mb-[20px] border border-gray">
          <Ionicons name="lock-closed-outline" size={20} color={Colors.background} />
          <TextInput
            className="flex-1 ml-[12px] text-[16px] text-background"
            placeholder="Confirm "
            placeholderTextColor={Colors.gray}
            value={password2}
            onChangeText={setPassword2}
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


        {/* SignUp Button */}
        <TouchableOpacity onPress={handleSignUp} className="mb-[30px]">
          <Text className="text-[18px] font-[600] text-primary">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-[14px] text-textPrimary">
            Already have an account?{' '} 
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-[14px] font-[600] text-primary">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
