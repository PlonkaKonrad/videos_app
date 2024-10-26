import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import useYouTubeVideos from '@/hooks/useYouTubeVideos';
import Loader from '@/components/Loader';
import SearchThumbnail from '@/components/SearchThumbnail';
import Sorting from '@/components/Sorting';
import { Video, YouTubeVideoItem } from '@/types';

const DEFAULT_QUERY = 'react native';

const SearchScreen: React.FC = () => {
  const { query } = useLocalSearchParams();
  const { isError, isLoading, videos, order, setOrder } = useYouTubeVideos(
    String(query?.length > 0 ? query : DEFAULT_QUERY),
    20
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBarWrapper />
        <Sorting order={order} setOrder={setOrder} />
        <VideoList isLoading={isLoading} isError={isError} videos={videos} />
      </ScrollView>
    </View>
  );
};

const SearchBarWrapper: React.FC = () => (
  <View style={styles.searchBarWrapper}>
    <SearchBar />
  </View>
);

interface VideoListProps {
  isLoading: boolean;
  isError: boolean;
  videos: YouTubeVideoItem[] | null;
}

const VideoList: React.FC<VideoListProps> = ({ isLoading, isError, videos }) => (
  <Loader isLoading={isLoading} error={isError}>
    {videos?.map((item) => (
      <SearchThumbnail video={item} key={item.id.videoId} />
    ))}
  </Loader>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  searchBarWrapper: {
    paddingHorizontal: 20,
  },
});

export default SearchScreen;
