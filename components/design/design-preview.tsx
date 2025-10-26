"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import Image from 'next/image';
import type { Design } from '@/lib/types';

interface DesignPreviewProps {
  design: Design;
  isOpen: boolean;
  onClose: () => void;
}

export const DesignPreview = ({ design, isOpen, onClose }: DesignPreviewProps) => {
  const [imageError, setImageError] = useState(false);
  const isGif = design.media.toLowerCase().endsWith('.gif');
  const isVideo = design.media.toLowerCase().endsWith('.mp4');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        size="lg"
      >
        <DialogHeader className="space-y-8 mb-12">
          {/* 第一行：标签区域 */}
          <div className="flex flex-wrap gap-4 items-center">
            {design.tag.split(',').map(tag => (
              <Badge key={tag.trim()} variant="display">
                {tag.trim()}
              </Badge>
            ))}
          </div>

          {/* 第二行：标题和描述 */}
          <DialogTitle className="line-clamp-2 !text-14">
            {design.name}<span className="font-normal">: {design.introduction}</span>
          </DialogTitle>
        </DialogHeader>

        {/* 第三行：设计案例展示区域 (8:5 比例) */}
        <div className="w-full aspect-[8/5] bg-bg-secondary rounded-4 overflow-hidden flex items-center justify-center relative">
          {imageError ? (
            <div className="text-fg-tertiary">媒体加载失败</div>
          ) : isVideo ? (
            <video
              src={design.media}
              className="w-full h-full object-contain select-none"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              onError={() => setImageError(true)}
              style={{ outline: 'none' }}
            />
          ) : (
            <Image
              src={design.media}
              alt={design.name}
              width={800}
              height={500}
              className="w-full h-full object-contain select-none"
              loading={isGif ? "lazy" : "eager"}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 80vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              unoptimized={isGif}
              style={{ outline: 'none' }}
            />
          )}
          {/* 内阴影覆盖层 */}
          <div
            className="absolute inset-0 pointer-events-none rounded-4 shadow-default"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
