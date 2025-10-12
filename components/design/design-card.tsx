import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils/date-utils';
import { useState, memo } from 'react';
import Image from 'next/image';
import type { Design } from '@/lib/types';

interface DesignCardProps {
  design: Design;
}

export const DesignCard = memo(({ design }: DesignCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none rounded-8 z-10"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)' }}
      />
      <div className="relative overflow-hidden">
        {/* 错误占位符 */}
        {imageError && (
          <div className="w-full aspect-[8/5] bg-bg-secondary flex items-center justify-center">
            <div className="text-fg-tertiary text-12">图片加载失败</div>
          </div>
        )}

        {/* 实际图片 */}
        {!imageError && (
          <Image
            src={design.media}
            alt={design.name}
            width={400}
            height={250}
            className="w-full aspect-[8/5] object-contain"
            loading="lazy"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
        )}
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
  );
});
