import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import TopicSection from '@/components/TopicSection';
import VideoThumbnail from '@/components/VideoThumbnail';
import useYouTubeVideos from '@/hooks/useYouTubeVideos';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const GEAR = require('@/assets/settings-icon.svg');

interface Topic {
  title: string;
  query: string;
}

export default function HomeScreen() {
  const router = useRouter();
  
  const topics: Topic[] = [
    { title: 'React Native', query: 'react native' },
    { title: 'React', query: 'react.js' },
    { title: 'Typescript', query: 'typescript' },
  ];

  const renderTopicSection = ({ title, query }: Topic) => {
    const { videos, isLoading, isError } = useYouTubeVideos(query);

    return (
      <TopicSection key={title} title={title} linkHref="" linkText="Show more">
        <Loader isLoading={isLoading} error={isError}>
          <View style={styles.row}>
            {videos?.map((item) => (
              <VideoThumbnail video={item} key={item.id.videoId} />
            ))}
          </View>
        </Loader>
      </TopicSection>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <SearchBar />
        <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push('/settings')}>
          <Image source={GEAR} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {topics.map((topic) => renderTopicSection(topic))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  row: {
    flexDirection: 'row',
    gap: 10
  },
  iconWrapper: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
  },
  searchBarWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});
