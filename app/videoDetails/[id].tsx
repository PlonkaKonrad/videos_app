import Loader from '@/components/Loader';
import Notes from '@/components/Notes';
import VideoScreen from '@/components/VideoScreen';
import useYouTubeVideoDetail from '@/hooks/useYoutubeVideosDetails';
import { RouteProp } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const VIEWS_ICON = require('@/assets/views-icon.svg');
const LIKES_ICON = require('@/assets/likes-icon.svg');

export type RootStackParamList = {
  videoDetails: { videoId: string };
  notFound: undefined;
};

type VideoDetailsProps = {
  route: RouteProp<RootStackParamList, 'videoDetails'>;
};

const VideoDetails: React.FC<VideoDetailsProps> = () => {
  const { id: videoId } = useLocalSearchParams();
  const { isError, isLoading, videoDetail, channelDetail } = useYouTubeVideoDetail(String(videoId));
  const [selectedTab, setSelectedTab] = useState<'Details' | 'Notes'>('Details'); // Zakładka domyślna

  const renderTabContent = () => {
    if (selectedTab === 'Details') {
      return (
        <View style={styles.detailsContent}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{videoDetail?.snippet.description}</Text>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <Statistics videoDetail={videoDetail} />
        </View>
      );
    }

    if (selectedTab === 'Notes') {
      return videoDetail?.id ? <Notes videoId={videoDetail.id} /> : null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Loader isLoading={isLoading} error={isError}>
        <VideoScreen videoId={String(videoDetail?.id)} />
        <View style={styles.contentWrapper}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {videoDetail?.snippet.title}
          </Text>
          <ChannelInfo channelDetail={channelDetail} />
          <TabNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {renderTabContent()}
        </View>
      </Loader>
    </ScrollView>
  );
};

const ChannelInfo: React.FC<{ channelDetail: any }> = ({ channelDetail }) => (
  <View style={styles.channelContainer}>
    <Image
      source={{ uri: channelDetail?.snippet.thumbnails.default.url }}
      style={styles.channelIcon}
    />
    <Text style={styles.channelName}>{channelDetail?.snippet.channelTitle}</Text>
  </View>
);

const TabNavigation: React.FC<{
  selectedTab: 'Details' | 'Notes';
  setSelectedTab: React.Dispatch<React.SetStateAction<'Details' | 'Notes'>>;
}> = ({ selectedTab, setSelectedTab }) => (
  <View style={styles.tabContainer}>
    <Tab title="Details" isActive={selectedTab === 'Details'} onPress={() => setSelectedTab('Details')} />
    <Tab title="Notes" isActive={selectedTab === 'Notes'} onPress={() => setSelectedTab('Notes')} />
  </View>
);

const Tab: React.FC<{ title: string; isActive: boolean; onPress: () => void }> = ({ title, isActive, onPress }) => (
  <TouchableOpacity style={[styles.tab, isActive && styles.activeTab]} onPress={onPress}>
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

const Statistics: React.FC<{ videoDetail: any }> = ({ videoDetail }) => (
  <View style={styles.statisticWrapper}>
    <Statistic icon={VIEWS_ICON} text={`${videoDetail?.statistics.viewCount} Views`} />
    <Statistic icon={LIKES_ICON} text={`${videoDetail?.statistics.likeCount} Likes`} />
  </View>
);

const Statistic: React.FC<{ icon: any; text: string }> = ({ icon, text }) => (
  <View style={styles.statistic}>
    <Image style={styles.statisticIcon} source={icon} />
    <Text style={styles.statisticText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  channelIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  channelName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#2B2D42',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#C8C8C8',
  },
  activeTab: {
    borderBottomColor: '#2B2D42',
  },
  tabText: {
    fontSize: 12,
    color: '#2B2D42',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 12,
  },
  activeTabText: {
    color: '#2B2D42',
  },
  detailsContent: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  description: {
    fontSize: 10,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  statisticWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  statistic: {
    backgroundColor: '#2B2D42',
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
  },
  statisticIcon: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  statisticText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
});

export default VideoDetails;
