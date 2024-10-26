import useSWR from "swr";
import { 
  YouTubeVideoDetailResponse, 
  YouTubeVideoDetailItem, 
  YouTubeChannelResponse, 
  YouTubeChannelItem 
} from '@/types'; 

const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useYouTubeVideoDetail = (videoId: string) => {
  
  const { data, error } = useSWR<YouTubeVideoDetailResponse>(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const channelId = data?.items[0]?.snippet.channelId || null;
  const {
    data: channelData,
    error: isChannelError,
    isLoading: isChannelLoading,
  } = useSWR<YouTubeChannelResponse>(
    channelId
      ? `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
      : null,
    fetcher
  );

  return {
    videoDetail: data?.items[0] as YouTubeVideoDetailItem || null, 
    channelDetail: channelData?.items[0] as YouTubeChannelItem || null, 
    isChannelLoading,
    isChannelError,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useYouTubeVideoDetail;
