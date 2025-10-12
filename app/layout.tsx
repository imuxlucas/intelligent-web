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
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma:wght@400&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 关键 CSS - 首屏样式 */
            body { 
              margin: 0; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #ffffff;
              color: #000000;
            }
            .min-h-screen { min-height: 100vh; }
            .bg-bg-primary { background-color: #ffffff; }
            .text-fg-primary { color: #000000; }
            .px-24 { padding-left: 24px; padding-right: 24px; }
            .py-32 { padding-top: 32px; padding-bottom: 32px; }
            .text-center { text-align: center; }
            .font-diy { font-family: 'Michroma', sans-serif; }
            .text-24 { font-size: 24px; line-height: 32px; }
            .text-16 { font-size: 16px; line-height: 24px; }
            .text-14 { font-size: 14px; line-height: 22px; }
            .font-500 { font-weight: 500; }
            .mb-16 { margin-bottom: 16px; }
            .tracking-2 { letter-spacing: 2px; }
            .mt-8 { margin-top: 8px; }
            .text-fg-secondary { color: rgba(0, 0, 0, 0.8); }
            .text-12 { font-size: 12px; line-height: 20px; }
            .text-fg-tertiary { color: rgba(0, 0, 0, 0.6); }
            .mt-16 { margin-top: 16px; }
          `
        }} />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}