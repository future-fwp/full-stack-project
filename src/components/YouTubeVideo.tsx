import { useState, useEffect } from 'react';
import axios from 'axios';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
  };
  statistics?: {
    viewCount: string;
  };
}

interface Comment {
  id: string;
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
      };
    };
  };
}

interface Props {
  type?: 'home' | 'explore' | 'movie' | 'gaming' | 'news' | 'sports' | 'learning';
}

const YouTubeVideo = ({ type = 'home' }: Props) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

  const getSearchQuery = () => {
    switch (type) {
      case 'explore':
        return 'trending';
      case 'movie':
        return 'full movie trailer 2024';
      case 'gaming':
        return 'gaming videos';
      case 'news':
        return 'latest news';
      case 'sports':
        return 'sports highlights';
      case 'learning':
        return 'educational content';
      default:
        return 'popular videos';
    }
  };

  const fetchVideos = async () => {
    try {
      const searchQuery = getSearchQuery();
      let params: Record<string, string> = {
        part: 'snippet',
        maxResults: '20',
        key: API_KEY,
      };

      if (type === 'explore') {
        params = {
          ...params,
          chart: 'mostPopular',
          regionCode: 'US',
        };
        const response = await axios.get(`${API_BASE_URL}/videos`, { params });
        const videosWithStats = response.data.items.map((item: any) => ({
          id: { videoId: item.id },
          snippet: item.snippet,
          statistics: item.statistics,
        }));
        setVideos(videosWithStats);
      } else {
        params = {
          ...params,
          q: searchQuery,
          type: 'video',
        };
        const response = await axios.get(`${API_BASE_URL}/search`, { params });
        const videoIds = response.data.items.map((item: Video) => item.id.videoId).join(',');
        
        // Get video statistics
        const statsResponse = await axios.get(`${API_BASE_URL}/videos`, {
          params: {
            part: 'statistics',
            id: videoIds,
            key: API_KEY,
          },
        });
        
        const videosWithStats = response.data.items.map((item: Video, index: number) => ({
          ...item,
          statistics: statsResponse.data.items[index]?.statistics,
        }));
        setVideos(videosWithStats);
      }
    } catch (err) {
      setError('Failed to fetch videos. Please try again later.');
      console.error('Error fetching videos:', err);
    }
  };

  useEffect(() => {
    if (!API_KEY) {
      setError('YouTube API key is missing. Please check your environment variables.');
      return;
    }
    fetchVideos();
  }, []);

  const fetchVideoComments = async (videoId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/commentThreads`, {
        params: {
          part: 'snippet',
          videoId: videoId,
          maxResults: 10,
          key: API_KEY,
        },
      });
      setComments(response.data.items);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const fetchRelatedVideos = async (videoId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: {
          part: 'snippet',
          relatedToVideoId: videoId,
          type: 'video',
          maxResults: 15,
          key: API_KEY,
        },
      });
      if (response.data.items) {
        // Get video statistics for each related video
        const videosWithStats = await Promise.all(
          response.data.items.map(async (video: Video) => {
            try {
              const statsResponse = await axios.get(`${API_BASE_URL}/videos`, {
                params: {
                  part: 'statistics',
                  id: video.id.videoId,
                  key: API_KEY,
                },
              });
              return {
                ...video,
                statistics: statsResponse.data.items[0]?.statistics || {},
              };
            } catch (error) {
              console.error('Error fetching video stats:', error);
              return video;
            }
          })
        );
        setRelatedVideos(videosWithStats);
      }
    } catch (error) {
      console.error('Error fetching related videos:', error);
      setRelatedVideos([]);
    }
  };

  const formatViewCount = (views: string) => {
    const viewCount = parseInt(views);
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M views`;
    } else if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}K views`;
    }
    return `${viewCount} views`;
  };

  const handleVideoSelect = async (video: Video) => {
    setSelectedVideo(video);
    await Promise.all([
      fetchVideoComments(video.id.videoId),
      fetchRelatedVideos(video.id.videoId),
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className={selectedVideo ? "lg:w-3/4" : "lg:w-full"}>
          {!selectedVideo ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {videos.slice(0, 8).map((video) => (
                <div
                  key={video.id.videoId}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg overflow-hidden border border-gray-200"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full"
                    />
                    {'statistics' in video && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                        {formatViewCount(video.statistics?.viewCount || '0')}
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-semibold text-lg truncate">
                      {video.snippet.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{video.snippet.channelTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                  title={selectedVideo.snippet.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold">{selectedVideo.snippet.title}</h2>
                <p className="text-gray-600">{selectedVideo.snippet.channelTitle}</p>
                <p className="mt-2 whitespace-pre-wrap">{selectedVideo.snippet.description}</p>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-start gap-2">
                          <img
                            src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                            alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold">
                              {comment.snippet.topLevelComment.snippet.authorDisplayName}
                            </p>
                            <p className="text-gray-700">{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No comments available</p>
                )}
              </div>
            </>
          )}
        </div>
        {selectedVideo ? (
          <div className="lg:w-1/4 border border-white space-y-4">
            <h3 className="text-lg font-semibold sticky top-0 bg-white py-2">Related Videos</h3>
            <div className="space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto">
              {(selectedVideo ? videos.slice(8) : relatedVideos).map((video) => (
                <div
                  key={video.id.videoId}
                  onClick={() => handleVideoSelect(video)}
                  className="cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="relative">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full rounded-lg"
                    />
                    {'statistics' in video && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                        {formatViewCount(video.statistics?.viewCount || '0')}
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h4 className="font-medium line-clamp-2 text-sm">
                      {video.snippet.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default YouTubeVideo;
