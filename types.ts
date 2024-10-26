
export interface Video {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      channelTitle: string;
      thumbnails: {
        default: {
          url: string;
        };
      };
    };
    statistics: {
      viewCount: string;
      likeCount: string;
    };
  }
  
  export type RootStackParamList = {
    videoDetails: { videoId: string };
    notFound: undefined;
  };
  
  export type IconName = 
    | 'home'
    | 'home-outline'
    | 'search'
    | 'search-outline'
    | 'repeat'
    | 'link'
    | 'at'
    | 'push'
    | 'map'
    | 'filter'
    | 'scale';
  
  export interface TabConfig {
    name: string;
    title: string;
    icon: IconName;
    iconOutline: IconName;
  }


  export type Order =  'date' | 'title' | 'viewCount'
  export enum YouTubeOrder {
    Date = 'date',
    Title = 'title',
    ViewCount = 'viewCount',
  }

  export interface UseYouTubeVideosResponse {
    videos: Video[];
    isLoading: boolean;
    isError: boolean;
    order: Order;
    setOrder: (order: string) => void; 
  }
    
  
  
  export interface VideoDetailsProps {
    route: {
      params: {
        videoId: string;
      };
    };
  }
  
  export interface SearchScreenProps {
    query: string;
  }
  

  export interface YouTubeThumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  export interface YouTubeVideoDetailItem {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: YouTubeThumbnail;
        medium: YouTubeThumbnail;
        high: YouTubeThumbnail;
      };
      channelTitle: string;
      liveBroadcastContent: string;
      publishTime: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      dislikeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }
  
  export interface YouTubeVideoDetailResponse {
    kind: string;
    etag: string;
    items: YouTubeVideoDetailItem[];
  }
  
  export interface YouTubeChannelItem {
    id: string;
    snippet: {
      title: string;
      thumbnails: {
        default: YouTubeThumbnail;
        medium: YouTubeThumbnail;
        high: YouTubeThumbnail;
      };
    };
  }
  
  export interface YouTubeChannelResponse {
    items: YouTubeChannelItem[];
  }

  export interface YouTubeThumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  export interface YouTubeVideoItem {
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: YouTubeThumbnail;
        medium: YouTubeThumbnail;
        high: YouTubeThumbnail;
      };
      channelTitle: string;
      liveBroadcastContent: string;
      publishTime: string;
    };
  }
  
  export interface YouTubeVideoResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    regionCode: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: YouTubeVideoItem[];
  }