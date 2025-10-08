"use client";

import { useState, useEffect } from 'react';
import { getDesigns } from '@/lib/supabase';
import type { Design } from '@/lib/types';

export const useDesigns = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDesigns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const designsData = await getDesigns();
        setDesigns(designsData || []);
      } catch (err) {
        console.error('加载设计案例失败:', err);
        setError('加载设计案例失败');
        setDesigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDesigns();
  }, []);

  const addDesign = (newDesign: Design) => {
    setDesigns(prev => [newDesign, ...prev]);
  };

  return {
    designs,
    isLoading,
    error,
    addDesign
  };
};
