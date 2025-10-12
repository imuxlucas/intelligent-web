"use client";

import { useState, useMemo, useCallback, Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DesignGrid } from '@/components/design/design-grid';
import { DesignGridSkeleton } from '@/components/design/design-grid-skeleton';
import { useAuth } from '@/lib/hooks/use-auth';
import { useDesigns } from '@/lib/hooks/use-designs';
import { filterDesigns, getAllTags } from '@/lib/utils/design-utils';
import type { Design, SearchFilters } from '@/lib/types';

export default function Home() {
  const { isLoggedIn, userName, userEmail, logout } = useAuth();
  const { designs, addDesign, isLoading } = useDesigns();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: '',
    selectedTags: []
  });

  const allTags = useMemo(() => getAllTags(designs), [designs]);
  const filteredDesigns = useMemo(() =>
    filterDesigns(designs, searchFilters.searchTerm, searchFilters.selectedTags),
    [designs, searchFilters.searchTerm, searchFilters.selectedTags]
  );

  const searchChange = useCallback((searchTerm: string) => {
    setSearchFilters(prev => ({ ...prev, searchTerm }));
  }, []);

  const tagToggle = useCallback((tag: string) => {
    setSearchFilters(prev => ({
      ...prev,
      selectedTags: tag === '' ? [] :
        prev.selectedTags.includes(tag)
          ? prev.selectedTags.filter(t => t !== tag)
          : [...prev.selectedTags, tag]
    }));
  }, []);

  const handleAddDesign = useCallback((newDesign: Design) => {
    addDesign(newDesign);
  }, [addDesign]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      alert('注销失败，请重试');
    }
  }, [logout]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header
        authState={{ isLoggedIn, userName, userEmail }}
        searchFilters={searchFilters}
        onSearchChange={searchChange}
        onTagToggle={tagToggle}
        onAddDesign={handleAddDesign}
        onLogout={handleLogout}
        allTags={allTags}
      />
      <main className="px-24">
        <Suspense fallback={<DesignGridSkeleton />}>
          {isLoading ? (
            <DesignGridSkeleton />
          ) : (
            <DesignGrid designs={filteredDesigns} />
          )}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}