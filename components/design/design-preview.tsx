"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarIcon } from '@/components/ui/icon';
import { useState } from 'react';
import Image from 'next/image';
import type { Design } from '@/lib/types';
import { analyzeDesignWithAI } from '@/lib/services/deepseek';

interface DesignPreviewProps {
  design: Design;
  isOpen: boolean;
  onClose: () => void;
}

export const DesignPreview = ({ design, isOpen, onClose }: DesignPreviewProps) => {
  const [imageError, setImageError] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const isGif = design.media.toLowerCase().endsWith('.gif');
  const isVideo = design.media.toLowerCase().endsWith('.mp4');

  const handleAIAnalysis = async () => {
    // 如果已有分析结果且当前没有显示分析，直接显示
    if (design.thinking && !showAnalysis) {
      setAiAnalysis(design.thinking);
      setShowAnalysis(true);
      return;
    }

    // 重新生成分析
    setIsAnalyzing(true);
    setAiAnalysis(null);
    setShowAnalysis(true);

    try {
      const analysis = await analyzeDesignWithAI({
        id: design.id,
        name: design.name,
        introduction: design.introduction,
        tag: design.tag,
        media: design.media,
      });
      setAiAnalysis(analysis);
    } catch (error) {
      setAiAnalysis('AI分析失败，请稍后重试');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    setShowAnalysis(false);
    setAiAnalysis(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        size="lg"
        className="max-w-[800px] w-full max-h-[calc(100vh-48px)] overflow-y-auto"
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

          {/* AI 解析按钮 */}
          <div className="flex justify-start">
            <Button
              onClick={handleAIAnalysis}
              disabled={isAnalyzing}
              variant="text"
              className="text-[#4150F7] h-[22px] hover:text-[#717CF9] active:text-[#717CF9] focus:outline-none focus:ring-0"
            >
              <div className="flex items-center gap-4 group">
                <StarIcon variant="16" iconType="primary" className="text-current" />
                <span>
                  {isAnalyzing
                    ? 'AI 分析中...'
                    : design.thinking
                      ? (showAnalysis ? '重新解析' : '查看 AI 分析')
                      : 'AI 解析'
                  }
                </span>
                <span className="group-hover:ml-4">→</span>
              </div>
            </Button>
          </div>
        </DialogHeader>

        {/* AI 分析结果 */}
        {showAnalysis && (
          <div className="mb-12 px-20 py-16 bg-bg-secondary rounded-8">
            <div className="text-14 text-fg-secondary leading-relaxed">
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-16 h-16 border-2 border-fg-tertiary border-t-transparent rounded-full"></div>
                  <span>正在分析设计案例...</span>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{aiAnalysis}</p>
              )}
            </div>
          </div>
        )}

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
