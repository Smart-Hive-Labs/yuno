import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    try {
      setIsMuted((prev) => !prev);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleMute}
      className="absolute top-10 right-5 p-2 rounded-full bg-black/50"
    >
      <Ionicons
        name={isMuted ? 'volume-mute' : 'volume-high'}
        size={24}
        color="#FFFFFF"
      />
    </TouchableOpacity>
  );
};

export default MuteButton;
