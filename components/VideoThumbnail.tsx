import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { YouTubeVideoItem } from '@/types';

interface VideoThumbnailProps {
  video: YouTubeVideoItem;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video }) => {
  const defaultThumbnail = require('@/assets/app-icon.svg');

  return (
    <Link href={`/videoDetails/${video.id.videoId}`} style={styles.container}>
      <Image
        source={video.snippet.thumbnails.default ? { uri: video.snippet.thumbnails.default.url } : defaultThumbnail}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {video.snippet.title}
        </Text>
        <Text style={styles.date}>
          {new Date(video.snippet.publishedAt).toLocaleDateString()}
        </Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    paddingLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
  thumbnail: {
    width: 150,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#000',
  },
  infoContainer: {
    paddingTop: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 14,
  },
  date: {
    fontSize: 10,
    color: '#777',
    lineHeight: 12,
    paddingTop: 4,
    textAlign: 'right',
  },
});

export default VideoThumbnail;
