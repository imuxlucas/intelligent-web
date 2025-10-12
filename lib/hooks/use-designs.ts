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

        // 使用 requestIdleCallback 来避免阻塞主线程
        const loadData = () => {
          getDesigns().then(designsData => {
            setDesigns(designsData || []);
            setIsLoading(false);
          }).catch(err => {
            console.error('加载设计案例失败:', err);
            setError('加载设计案例失败');
            setDesigns([]);
            setIsLoading(false);
          });
        };

        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadData);
        } else {
          setTimeout(loadData, 0);
        }
      } catch (err) {
        console.error('加载设计案例失败:', err);
        setError('加载设计案例失败');
        setDesigns([]);
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
