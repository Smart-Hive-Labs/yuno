import { Ionicons } from '@expo/vector-icons';
import { VideoView } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

interface VideoPlayerProps {
  videoUrl: string;
  isVisible: boolean;
  isMuted: boolean;
  onMuteToggle: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  isVisible,
  isMuted,
  onMuteToggle,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<VideoView>(null);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      handlePlay();
    } else if (!isVisible && videoRef.current) {
      handlePause();
    }
  }, [isVisible]);

  const handlePlay = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.playAsync();
        setIsPlaying(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error playing video:', err);
      setError('Failed to play video');
      Alert.alert('Playback Error', 'Unable to play this video');
    }
  };

  const handlePause = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Error pausing video:', err);
      setError('Failed to pause video');
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await handlePause();
    } else {
      await handlePlay();
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = (error: any) => {
    console.error('Video playback error:', error);
    setError('Video failed to load');
    setIsLoading(false);
    Alert.alert('Video Error', 'This video could not be loaded');
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      

    }
  };

  if (error) {
    return (
      <View className={`flex-1 justify-center items-center bg-gray-900 ${className}`}>
        <Text className="text-white text-center px-4">
          Unable to load video
        </Text>
        <Pressable
          onPress={() => {
            setError(null);
            setIsLoading(true);
          }}
          className="mt-4 px-6 py-3 bg-blue-500 rounded-lg"
        >
          <Text className="text-white font-medium">Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className={`flex-1 relative ${className}`}>
      <VideoView
        ref={videoRef}
        style={{ flex: 1 }}
        source={{ uri: videoUrl }}
        shouldPlay={isVisible && isPlaying}
        isLooping
        isMuted={isMuted}
        resizeMode="cover"
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onError={handleError}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
      
      {/* Play/Pause Overlay */}
      <Pressable
        onPress={togglePlayback}
        className="absolute inset-0 justify-center items-center"
      >
        {!isPlaying && !isLoading && (
          <View className="bg-black/30 rounded-full p-4">
          <Ionicons name="play" size={40} color="white" fill="#FFFFFF"/>
          </View>
        )}
      </Pressable>

      {/* Loading Indicator */}
      {isLoading && (
        <View className="absolute inset-0 justify-center items-center bg-black/50">
          <View className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </View>
      )}
    </View>
  );
};

export default VideoPlayer;