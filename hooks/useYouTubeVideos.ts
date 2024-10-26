import { useState } from 'react';
import useSWR from 'swr';
import { YouTubeVideoResponse, YouTubeVideoItem, Order } from '@/types'; 

const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY

console.log(API_KEY)
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface useYouTubeVideosReturn {
  videos: YouTubeVideoItem[] | null,
  isLoading: boolean, 
  isError: boolean,
  order: Order,
  setOrder: (order:Order) => void,
}

const useYouTubeVideos = (query: string, limit = 5):useYouTubeVideosReturn => {
  const [order, setOrder] = useState<Order>('date');

  const { data, error } = useSWR<YouTubeVideoResponse>(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&type=video&maxResults=${limit}&order=${order}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    videos: data?.items || null,
    isLoading: !error && !data, 
    isError: error,
    order,
    setOrder,
  };
};

export default useYouTubeVideos;
