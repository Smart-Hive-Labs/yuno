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
import PinScreen from './PinComponent';

const BiometricAuth = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [canUseSystemAuth, setCanUseSystemAuth] = useState(false);
  const [showPinScreen, setShowPinScreen] = useState(false);

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
        promptMessage: 'Authenticate to access Scriven',
        fallbackLabel: 'Use device passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        onSuccess();
      } else if (result.error === 'user_cancel' || result.error === 'system_cancel') {
        Alert.alert('Cancelled', 'Authentication cancelled.');
      } else {
        
        setShowPinScreen(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication error occurred.');
      setShowPinScreen(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (showPinScreen) {
    return <PinScreen  />;
  }

  return (
    <View style={styles.centered}>
      {canUseSystemAuth && (
        <Button title="Try Again" onPress={handleAuth} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BiometricAuth;
