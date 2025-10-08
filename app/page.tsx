"use client";

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DesignGrid } from '@/components/design/design-grid';
import { useAuth } from '@/lib/hooks/use-auth';
import { useDesigns } from '@/lib/hooks/use-designs';
import { filterDesigns, getAllTags } from '@/lib/utils/design-utils';
import type { Design, SearchFilters } from '@/lib/types';

export default function Home() {
  const { isLoggedIn, userName, userEmail, logout } = useAuth();
  const { designs, addDesign } = useDesigns();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: '',
    selectedTags: []
  });

  const allTags = useMemo(() => getAllTags(designs), [designs]);
  const filteredDesigns = useMemo(() =>
    filterDesigns(designs, searchFilters.searchTerm, searchFilters.selectedTags),
    [designs, searchFilters.searchTerm, searchFilters.selectedTags]
  );

  const handlers = useMemo(() => ({
    searchChange: (searchTerm: string) =>
      setSearchFilters(prev => ({ ...prev, searchTerm })),
    tagToggle: (tag: string) =>
      setSearchFilters(prev => ({
        ...prev,
        selectedTags: tag === '' ? [] :
          prev.selectedTags.includes(tag)
            ? prev.selectedTags.filter(t => t !== tag)
            : [...prev.selectedTags, tag]
      })),
    addDesign: (newDesign: Design) => addDesign(newDesign),
    logout: async () => {
      try { await logout(); }
      catch (error) { alert('注销失败，请重试'); }
    }
  }), [addDesign, logout]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header
        authState={{ isLoggedIn, userName, userEmail }}
        searchFilters={searchFilters}
        onSearchChange={handlers.searchChange}
        onTagToggle={handlers.tagToggle}
        onAddDesign={handlers.addDesign}
        onLogout={handlers.logout}
        allTags={allTags}
      />
      <main className="px-24">
        <DesignGrid designs={filteredDesigns} />
      </main>
      <Footer />
    </div>
  );
}