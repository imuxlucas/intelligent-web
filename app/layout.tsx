import './globals.css';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Intelligent Web - Web AI设计灵感平台',
  description: '发现优秀的Web设计案例，汇聚全球最佳设计灵感，为您的创作提供无限可能',
  keywords: 'Web设计, UI设计, 设计灵感, 创意平台, 前端设计',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Michroma:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}