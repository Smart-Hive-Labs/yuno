import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuthStore } from '@/store/useAuthStore';

const BiometricAuth = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [canUseSystemAuth, setCanUseSystemAuth] = useState(false);
  const [showPinScreen, setShowPinScreen] = useState(false);
  const [showRetryPrompt, setShowRetryPrompt] = useState(false);

  const setSignedIn = useAuthStore(state=>state.setSignedIn)
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (compatible) {
        if (enrolled) {
          setCanUseSystemAuth(true);
          handleAuth();
        } else {
          setShowPinScreen(true);
        }
      } else {
        setShowPinScreen(true);
      }

      setLoading(false);
    })();
  }, []);

  const handleAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access Yuno',
        fallbackLabel: 'Use device passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        onSuccess();
      } else if (result.error === 'user_cancel' || result.error === 'system_cancel') {
        Alert.alert('Cancelled', 'Authentication cancelled.');
      } else {
        setShowRetryPrompt(true);
        setShowPinScreen(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication error occurred.');
      setShowPinScreen(true);
      
    }
  };

  if (loading) {
    return (
      <View className='flex justify-center items-center'>
        <ActivityIndicator size="large" />
      </View>
    );
  }

/*if (showPinScreen) {
    return <PinScreen  onSuccess={() => {
        setShowPinScreen(false);
        setSignedIn(true)
      }} />;
  }*/

  return (
    <>
    </>
  );
};


export default BiometricAuth;
