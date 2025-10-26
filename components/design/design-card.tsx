import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils/date-utils';
import { useState, memo } from 'react';
import Image from 'next/image';
import type { Design } from '@/lib/types';
import { DesignPreview } from '@/components/design/design-preview';

interface DesignCardProps {
  design: Design;
}

export const DesignCard = memo(({ design }: DesignCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isGif = design.media.toLowerCase().endsWith('.gif');
  const isVideo = design.media.toLowerCase().endsWith('.mp4');

  const handleImageClick = () => {
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  return (
    <>
      <Card className="overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none rounded-8 z-10"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)' }}
        />
        <div className="relative overflow-hidden">
          {/* 固定尺寸容器，防止布局偏移 */}
          <div
            className="w-full aspect-[8/5] bg-bg-secondary flex items-center justify-center relative cursor-pointer hover:bg-bg-light transition-colors duration-200"
            onClick={handleImageClick}
          >
            {imageError ? (
              <div className="text-fg-tertiary text-12">媒体加载失败</div>
            ) : isVideo ? (
              <video
                src={design.media}
                className="w-full h-full object-contain"
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                src={design.media}
                alt={design.name}
                width={400}
                height={250}
                className="w-full h-full object-contain"
                loading="lazy"
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                unoptimized={isGif}
              />
            )}
          </div>
        </div>
        <CardContent className="p-20 pb-16 space-y-8">
          <div className="flex flex-wrap gap-4">
            {design.tag.split(',').map(tag => (
              <Badge key={tag.trim()} variant="display">
                {tag.trim()}
              </Badge>
            ))}
          </div>
          <p className="line-clamp-2">
            <span className="font-semibold">{design.name}</span>: {design.introduction}
          </p>
          <div className="text-12 text-fg-tertiary">
            由 {design.uploader} 上传于 {formatDate(design.uploaded_at)}
          </div>
        </CardContent>
      </Card>

      {/* 预览对话框 */}
      <DesignPreview
        design={design}
        isOpen={isPreviewOpen}
        onClose={handlePreviewClose}
      />
    </>
  );
});
