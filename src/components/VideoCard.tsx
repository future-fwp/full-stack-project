import { CheckCircle2 } from 'lucide-react';
import type { Video } from '../lib/mockData';
import { formatViews, formatUploadDate } from '../lib/mockData';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {video.duration}
        </span>
      </div>
      
      <div className="flex gap-3 mt-3">
        <img 
          src={video.channel.avatarUrl}
          alt={video.channel.name}
          className="w-9 h-9 rounded-full"
        />
        
        <div>
          <h3 className="font-medium line-clamp-2">{video.title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <span>{video.channel.name}</span>
            {video.channel.verified && (
              <CheckCircle2 className="w-4 h-4 text-gray-500" />
            )}
          </div>
          <div className="text-sm text-gray-600">
            {formatViews(video.views)} views • {formatUploadDate(video.uploadedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}