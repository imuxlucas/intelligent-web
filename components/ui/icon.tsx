import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: LucideIcon;
  variant?: '12' | '16' | '24';
  iconType?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const VARIANT_SIZES = {
  12: 12,  // 12px
  16: 16,  // 16px
  24: 24,  // 24px
} as const;

const ICON_TYPE_CLASSES = {
  primary: 'opacity-100',
  secondary: 'opacity-80',
  tertiary: 'opacity-60',
} as const;

export const Icon = ({
  icon: IconComponent,
  variant = '16',
  iconType = 'primary',
  className
}: IconProps) => {
  const iconSize = VARIANT_SIZES[variant];

  return (
    <IconComponent
      size={iconSize}
      className={cn(
        'text-current',
        ICON_TYPE_CLASSES[iconType],
        className
      )}
    />
  );
};

// 预定义的常用图标组件
export const SearchIcon = (props: Omit<IconProps, 'icon'>) => (
  <Icon icon={require('lucide-react').Search} {...props} />
);

export const MenuIcon = (props: Omit<IconProps, 'icon'>) => (
  <Icon icon={require('lucide-react').Menu} {...props} />
);

export const XIcon = (props: Omit<IconProps, 'icon'>) => (
  <Icon icon={require('lucide-react').X} {...props} />
);

export const UploadIcon = (props: Omit<IconProps, 'icon'>) => (
  <Icon icon={require('lucide-react').Upload} {...props} />
);

export const TrashIcon = (props: Omit<IconProps, 'icon'>) => (
  <Icon icon={require('lucide-react').Trash} {...props} />
);

export const StarIcon = (props: Omit<IconProps, 'icon'>) => (
  <Icon icon={require('lucide-react').Star} {...props} />
);