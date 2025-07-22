import { Ionicons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

// Responsive height function
const getSnapHeight = () => {
  const { height } = Dimensions.get('window');
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
  return height - statusBarHeight;
};

// VideoPlayer Component
const VideoPlayer = ({ videoUrl, isVisible, isMuted, onMuteToggle, onDoubleClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.muted = isMuted;
    if (isVisible) player.play();
  });

  useEffect(() => {
    isVisible ? player.play() : player.pause();
  }, [isVisible, player]);

  useEffect(() => {
    player.muted = isMuted;
  }, [isMuted, player]);

  useEffect(() => {
    const subscription = player.addListener('playingChange', setIsPlaying);
    const statusSubscription = player.addListener('statusChange', (status) => {
      if (status === 'loading') {
        setIsLoading(true);
        setError(null);
      } else if (status === 'readyToPlay') {
        setIsLoading(false);
        setError(null);
      } else if (status === 'error') {
        setIsLoading(false);
        setError('Video failed to load');
      }
    });

    return () => {
      subscription?.remove();
      statusSubscription?.remove();
    };
  }, [player]);

  const togglePlayback = () => {
    isPlaying ? player.pause() : player.play();
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load video</Text>
        <TouchableOpacity
          onPress={() => {
            setError(null);
            setIsLoading(true);
            player.replace(videoUrl);
          }}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.videoContainer}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />
      <TouchableOpacity onPress={togglePlayback} style={styles.playOverlay} activeOpacity={1}>
        {!isPlaying && !isLoading && (
          <View style={styles.playButton}>
            <Ionicons name="play" size={40} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <View style={styles.spinner} />
        </View>
      )}
    </View>
  );
};

// Mute Button
const MuteButton = ({ isMuted, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={styles.muteButton} activeOpacity={0.7}>
    <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={20} color="#FFFFFF" />
  </TouchableOpacity>
);

// Sample Posts
const samplePosts = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    username: "john_teacher",
    caption: "Understanding photosynthesis through this amazing animation! 🌱 #biology #science #education",
    school: "Springfield High",
    hashtags: ["#biology", "#science", "#education", "#photosynthesis"],
    likes: 1205,
    comments: 89,
    isLiked: false,
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    username: "math_wizard",
    caption: "Calculus made simple! Here's how derivatives work in real life 📊 #math #calculus #learning",
    school: "Tech Academy",
    hashtags: ["#math", "#calculus", "#learning", "#derivatives"],
    likes: 892,
    comments: 67,
    isLiked: true,
  },
];

const HomeFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState(samplePosts);
  const [isMuted, setIsMuted] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const listRef = useRef(null);

  const { height: SCREEN_HEIGHT } = useWindowDimensions(); 

  const handleDoublePress = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap < DOUBLE_TAP_DELAY) toggleLike();
    setLastTap(now);
  };

  const toggleLike = () => {
    setPosts((prev) =>
      prev.map((post, index) =>
        index === currentIndex
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((res) => setTimeout(res, 1500));
    const newPost = {
      id: Date.now(),
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      username: "new_creator",
      caption: "Fresh content just for you! 🔥 #trending #new #educational",
      school: "Innovation Academy",
      hashtags: ["#trending", "#new", "#educational", "#fresh"],
      likes: 42,
      comments: 8,
      isLiked: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setIsRefreshing(false);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={[styles.container, { height: SCREEN_HEIGHT }]}>
      <FlatList
        ref={listRef}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#FFFFFF"
            colors={['#00C3FF', '#FF2DAF']}
            progressBackgroundColor="#1F2937"
            title="Pull to refresh"
            titleColor="#FFFFFF"
          />
        }
        renderItem={({ item, index }) => (
          <View style={{ height: SCREEN_HEIGHT }}>
            <VideoPlayer
              videoUrl={item.videoUrl}
              isVisible={index === currentIndex}
              isMuted={isMuted}
              onMuteToggle={() => setIsMuted(!isMuted)}
              onDoubleClick={handleDoublePress}
            />

            <View style={styles.gradientOverlay} />
            {index === 0 && (
              <View style={styles.topNav}>
                <Text style={styles.title}>For You</Text>
                <TouchableOpacity style={styles.navButton}>
                  <Ionicons name="ellipsis-vertical" size={20} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.rightActions}>
              <MuteButton isMuted={isMuted} onToggle={() => setIsMuted(!isMuted)} />
              <TouchableOpacity onPress={toggleLike} style={styles.actionButton}>
                <Ionicons
                  name={item.isLiked ? "heart" : "heart-outline"}
                  size={24}
                  color={item.isLiked ? "#FF2DAF" : "#FFFFFF"}
                />
              </TouchableOpacity>
              <Text style={styles.actionText}>{item.likes.toLocaleString()}</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.actionText}>{item.comments}</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="arrow-redo-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomContent}>
              <View style={styles.schoolBadge}>
                <Text style={styles.schoolText}>{item.school}</Text>
              </View>
              <Text style={styles.username}>@{item.username}</Text>
              <Text style={styles.caption}>{item.caption}</Text>
              <View style={styles.hashtags}>
                {item.hashtags.map((tag, i) => (
                  <Text key={i} style={styles.hashtag}>{tag}</Text>
                ))}
              </View>
            </View>

            <View style={styles.progressContainer}>
              {posts.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.progressBar,
                    i === currentIndex && styles.activeProgressBar,
                  ]}
                />
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0617' },
  videoContainer: { width: '100%', height: '100%', overflow: 'hidden' },
  video: { width: '100%', height: '100%' },
  playOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  playButton: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 30, padding: 16 },
  loadingContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },

  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111827' },
  errorText: { color: '#FFFFFF', marginBottom: 16, fontSize: 16 },
  retryButton: { backgroundColor: '#3B82F6', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  retryButtonText: { color: '#FFFFFF', fontWeight: '500', fontSize: 16 },
  gradientOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' },
  topNav: { position: 'absolute', top: 48, left: 160, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, zIndex: 30 },
  navButton: { padding: 8 },
  title: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 },
  rightActions: { position: 'absolute', right: 16, bottom: 128, alignItems: 'center', zIndex: 30 },
  muteButton: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: 12, marginBottom: 24 },
  actionButton: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: 12, marginBottom: 8 },
  actionText: { color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginBottom: 16, textAlign: 'center' },
  bottomContent: { position: 'absolute', bottom: 32, left: 16, right: 80, zIndex: 30 },
  schoolBadge: { backgroundColor: 'rgba(0,195,255,0.9)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginBottom: 12 },
  schoolText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  username: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  caption: { color: '#FFFFFF', fontSize: 16, lineHeight: 24, marginBottom: 8 },
  hashtags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  hashtag: { color: '#00C3FF', fontSize: 14, fontWeight: '500' },
  progressContainer: { position: 'absolute', right: 16, top: '50%', alignItems: 'center', zIndex: 30 },
  progressBar: { width: 4, height: 32, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, marginVertical: 4 },
  activeProgressBar: { backgroundColor: '#00C3FF' },
});

export default HomeFeed;
