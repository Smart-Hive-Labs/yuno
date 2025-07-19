import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputProps,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

const { height, width } = Dimensions.get('screen');

const PinScreen = () => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [verified, setVerified] = useState<boolean>(false);

  const inputRefs = useRef<any>([]);
  const animations = useRef(digits.map(() => useSharedValue(1))).current;
  const shakeX = useSharedValue<number>(0);

const onSuccess = () => {
    console.log(' PIN Verified! Proceeding...');
    router.replace("/(tabs)")
  };

  useEffect(() => {
    if (digits.every(d => d !== '')) {
      validatePin(digits.join(''));
    }
  }, [digits]);

  const validatePin = (fullPin: string) => {
    const isPinValid = fullPin === '1234';
    setIsValid(isPinValid);
    setVerified(isPinValid);
    if(isPinValid){
      runOnJS(()=>onSuccess())
    }
    else {
      shakeX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  };

  const handleChange = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
      setCurrentIndex(index + 1);
    }

    animations[index].value = withSequence(
      withTiming(1.2, { duration: 100 }),
      withSpring(1)
    );
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      setIsValid(true);

      if (digits[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setCurrentIndex(index - 1);
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    }
  };

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        {digits.map((digit, index) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: animations[index].value }],
          }));

          return (
            <Animated.View
              key={index}
              style={[
                styles.inputContainer,
                animatedStyle,
                !isValid && styles.invalidInput,
                currentIndex === index &&
                  isValid && { borderColor: '#d5a166', borderWidth: 2 },
                verified && { borderColor: 'green', borderWidth: 2 },
              ]}
            >
              <TextInput
                style={styles.input}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                ref={(ref:any) => (inputRefs.current[index] = ref)}
              />
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    height,
    width,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
  invalidInput: {
    borderColor: 'red',
  },
});

export default PinScreen;
