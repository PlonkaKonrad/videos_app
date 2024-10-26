import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface VideoScreenProps {
  videoId: string;
}

const VideoScreen: React.FC<VideoScreenProps> = ({ videoId }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={220}
        width={Dimensions.get('window').width}
        play={playing}
        videoId={videoId}
        onChangeState={(event) => {
          if (event === 'ended') {
            setPlaying(false);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default VideoScreen;
