import { YouTubeVideoItem } from '@/types';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface VideoThumbnailProps {
  video: YouTubeVideoItem;
}

const SearchThumbnail: React.FC<VideoThumbnailProps> = ({ video }) => {
  const defaultThumbnail = require('@/assets/app-icon.svg');

  const thumbnailUrl = video.snippet.thumbnails.high?.url || defaultThumbnail;

  return (
    <Link href={`/videoDetails/${video.id.videoId}`} style={styles.container}>
      <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {video.snippet.title}
        </Text>
        <Text style={styles.date}>{new Date(video.snippet.publishedAt).toLocaleDateString()}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Medium',
  },
  thumbnail: {
    width: '100%',
    height: 200,
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
    lineHeight: 12,
  },
  date: {
    fontSize: 10,
    color: '#777',
    lineHeight: 10,
    paddingTop: 8,
    textAlign: 'right',
  },
});

export default SearchThumbnail;
