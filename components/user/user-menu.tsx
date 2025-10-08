"use client";

import { getWeekday } from '@/lib/utils/date-utils';

interface UserMenuProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export const UserMenu = ({ userName, userEmail, onLogout }: UserMenuProps) => {
  return (
    <div className="relative group">
      <div className="flex items-center cursor-pointer hover:bg-ghost-hover rounded-8 px-12 py-7">
        <span>
          🖥 {getWeekday()}好，{userName.charAt(0).toUpperCase() + userName.slice(1)}！
        </span>
      </div>

      {/* 下拉菜单内容 */}
      <div className="absolute mt-4 w-full bg-bg-light rounded-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-4">
          <div className="text-fg-tertiary text-12 px-12 py-8">{userEmail}</div>
          <div className="bg-line-default h-px mx-12 my-3.5"></div>
          <div className="px-12 py-8 hover:bg-ghost-hover active:bg-ghost-active cursor-pointer rounded-6" onClick={onLogout}>
            退出登录
          </div>
        </div>
      </div>
    </div>
  );
};
