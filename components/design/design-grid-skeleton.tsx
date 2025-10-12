import { Card, CardContent } from '@/components/ui/card';

export const DesignGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-20">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="w-full aspect-[8/5] bg-bg-secondary animate-pulse" />
          <CardContent className="p-20 pb-16 space-y-8">
            <div className="flex flex-wrap gap-4">
              <div className="h-6 w-16 bg-bg-secondary rounded animate-pulse" />
              <div className="h-6 w-20 bg-bg-secondary rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-bg-secondary rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-bg-secondary rounded animate-pulse" />
            </div>
            <div className="h-3 w-1/2 bg-bg-secondary rounded animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
