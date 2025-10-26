"use client";

import { useState } from 'react';
import { SearchIcon, MenuIcon, XIcon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AuthDialog } from '@/components/auth/auth-dialog';
import { UploadDialog } from '@/components/design/upload-dialog';
import { UserMenu } from '@/components/user/user-menu';
import { getWeekday } from '@/lib/utils/date-utils';
import type { Design, SearchFilters } from '@/lib/types';

interface HeaderProps {
  authState: {
    isLoggedIn: boolean;
    userName: string;
    userEmail: string;
  };
  searchFilters: SearchFilters;
  onSearchChange: (searchTerm: string) => void;
  onTagToggle: (tag: string) => void;
  onAddDesign: (design: Design) => void;
  onLogout: () => void;
  allTags: string[];
}

export const Header = ({
  authState,
  searchFilters,
  onSearchChange,
  onTagToggle,
  onAddDesign,
  onLogout,
  allTags
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <>
      {/* 导航栏 */}
      <nav className="bg-bg-primary sticky top-0 z-50">
        <div className="flex items-center h-68 gap-12 px-24">
          <h2 className="tracking-[0.08em]">品质 AI</h2>

          {/* 桌面搜索框 */}
          <div className="relative w-full hidden md:flex flex-1 min-w-0">
            <SearchIcon iconType="tertiary" className="absolute left-12 top-10" />
            <Input
              variant="desktopSearch"
              placeholder={isSearchFocused ? "搜索标签，产品名称，亮点描述或上传者昵称" : ""}
              value={searchFilters.searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center gap-12 flex-shrink-0">
            {authState.isLoggedIn ? (
              <UserMenu
                userName={authState.userName}
                userEmail={authState.userEmail}
                onLogout={onLogout}
              />
            ) : (
              <AuthDialog onLogin={() => { }} />
            )}
            <UploadDialog
              onAddDesign={onAddDesign}
              currentUser={{ username: authState.userName, isLoggedIn: authState.isLoggedIn }}
            />
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden ml-auto">
            <Button variant="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>
        <div className="border-b border-line-default -mt-px"></div>
      </nav>

      {/* 移动端导航 */}
      {isMenuOpen && (
        <>
          {/* 蒙层 */}
          <div
            className="fixed inset-0 bg-mask-neutral backdrop-blur-8 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 菜单内容 */}
          <div className="fixed left-0 right-0 bg-bg-primary z-50 md:hidden">
            <div className="px-24 py-24 space-y-16">
              {/* 移动端搜索框 */}
              <div className="relative">
                <SearchIcon iconType="secondary" className="absolute left-12 top-10" />
                <Input
                  variant="mobileSearch"
                  placeholder="搜索标签，产品名称，亮点描述或上传者昵称"
                  value={searchFilters.searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>

              {authState.isLoggedIn ? (
                <div className="w-full flex items-center px-12 justify-between">
                  <span>
                    🖥 {getWeekday()}好，{authState.userName.charAt(0).toUpperCase() + authState.userName.slice(1)}！
                  </span>
                  <Button variant="text" onClick={onLogout}>
                    退出登录
                  </Button>
                </div>
              ) : (
                <div>
                  <AuthDialog onLogin={() => { }} />
                </div>
              )}
              <UploadDialog
                onAddDesign={onAddDesign}
                currentUser={{ username: authState.userName, isLoggedIn: authState.isLoggedIn }}
              />
            </div>
          </div>
        </>
      )}

      {/* 标题和标签筛选区域 */}
      <div className="px-24 py-32">
        <div className="text-center">
          <h1>🔵 塑造 AI 品质体验</h1>

          {/* 标签筛选 */}
          <div className="flex flex-wrap gap-6 justify-center">
            <Badge
              variant={searchFilters.selectedTags.length === 0 ? "action-selected" : "action-unselected"}
              onClick={() => onTagToggle('')}
            >
              全部标签
            </Badge>
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={searchFilters.selectedTags.includes(tag) ? "action-selected" : "action-unselected"}
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
