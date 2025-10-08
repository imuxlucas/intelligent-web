"use client";

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import type { AuthState } from '@/lib/types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userName: '用户',
    userEmail: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user && !error) {
          setAuthState({
            isLoggedIn: true,
            userName: user.user_metadata?.username || user.email?.split('@')[0] || '用户',
            userEmail: user.email || ''
          });
        } else {
          setAuthState({
            isLoggedIn: false,
            userName: '用户',
            userEmail: ''
          });
        }
      } catch (error) {
        setAuthState({
          isLoggedIn: false,
          userName: '用户',
          userEmail: ''
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setAuthState({
          isLoggedIn: true,
          userName: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '用户',
          userEmail: session.user.email || ''
        });
      } else {
        setAuthState({
          isLoggedIn: false,
          userName: '用户',
          userEmail: ''
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('注销失败:', error);
      throw error;
    }
  };

  return {
    ...authState,
    isLoading,
    logout
  };
};
