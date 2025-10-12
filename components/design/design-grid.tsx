import { DesignCard } from './design-card';
import { memo, useMemo } from 'react';
import type { Design } from '@/lib/types';

interface DesignGridProps {
  designs: Design[];
}

export const DesignGrid = memo(({ designs }: DesignGridProps) => {
  const memoizedDesigns = useMemo(() => designs, [designs]);

  if (memoizedDesigns.length === 0) {
    return (
      <div className="text-center h-full py-auto">
        <p className="text-fg-secondary">没有找到匹配的设计案例</p>
        <p className="text-12 text-fg-tertiary">尝试调整搜索条件或标签筛选</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-20">
      {memoizedDesigns.map(design => (
        <DesignCard key={design.id} design={design} />
      ))}
    </div>
  );
});
