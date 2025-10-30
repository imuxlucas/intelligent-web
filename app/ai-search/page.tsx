"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ArrowUpIcon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { searchDesignWithAI } from '@/lib/services/deepseek';
import { useDesigns } from '@/lib/hooks/use-designs';

export default function AISearchPage() {
  const router = useRouter();
  const { designs, isLoading: designsLoading } = useDesigns();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // 打字机效果函数
  const typeText = (text: string) => {
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30); // 每30ms显示一个字符
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      setHasSearched(true);

      try {
        // 准备设计案例数据，只传递需要的字段
        const designData = designs.map(design => ({
          id: design.id,
          name: design.name,
          introduction: design.introduction,
          tag: design.tag,
          media: design.media
        }));

        // 调用真实的DeepSeek API，传递所有设计案例
        const aiResponse = await searchDesignWithAI(searchQuery, designData);

        // 保存完整结果并开始打字机效果
        setSearchResult(aiResponse);
        typeText(aiResponse);
      } catch (error) {
        console.error('AI搜索失败:', error);
        const errorMessage = '抱歉，AI搜索服务暂时不可用。请检查网络连接或稍后重试。您也可以尝试重新描述您的设计需求。';
        setSearchResult(errorMessage);
        typeText(errorMessage);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* 简化的导航栏 - 只有返回按钮 */}
      <nav className="bg-bg-primary sticky top-0 z-50">
        <div className="flex items-center h-68 gap-12 px-24">
          <Button
            variant="text"
            onClick={() => router.back()}
            className="text-14 flex items-center gap-4"
          >
            <ArrowLeftIcon variant="16" iconType="primary" />
            返回
          </Button>
        </div>
        <div className="border-b border-line-default -mt-px"></div>
      </nav>

      {/* 主要内容区域 */}
      <main className={`flex-1 px-auto py-auto ${hasSearched ? 'h-screen flex flex-col' : 'h-screen flex items-center justify-center'}`}>
        {!hasSearched ? (
          // 初始状态 - 居中显示
          <div className="w-full max-w-600 mx-auto">
            {/* 标题 */}
            <h1 className="text-30 font-500 mb-16 tracking-[0.2em] text-center">Hi, 我是 Lugent</h1>

            {/* 搜索输入区域 */}
            <div className="relative w-[800px] h-[144px] mx-auto">
              <Textarea
                placeholder="例如：你可以输入任何有关 AI 设计的问题"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-[144px] px-12 py-12 text-14 rounded-[20px] shadow-default border border-line-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {/* 发送按钮 */}
              <Button
                variant="fill"
                className="absolute bottom-[12px] right-[12px] rounded-[18px]"
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
              >
                <ArrowUpIcon variant="16" iconType="primary" />
              </Button>
            </div>

            {/* 提示文字 */}
            <div className="text-center mt-24">
              <p className="text-fg-tertiary text-12">
                按 Enter 发送，Shift + Enter 换行
              </p>
            </div>
          </div>
        ) : (
          // 搜索后状态 - 内容区域 + 底部搜索框
          <>
            {/* 搜索结果区域 */}
            <div className="flex-1 overflow-y-auto px-24 py-24">
              <div className="max-w-800 mx-auto">
                {isSearching ? (
                  <div className="text-center py-32">
                    <div className="animate-spin w-24 h-24 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-16"></div>
                    <p className="text-fg-secondary">AI 正在深度思考中...</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-16 shadow-default p-24">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-14 leading-24 text-fg-primary">
                        {displayedText}
                        {isTyping && <span className="animate-pulse">|</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 底部搜索框 */}
            <div className="border-t border-line-default bg-bg-primary px-24 py-16">
              <div className="max-w-800 mx-auto">
                <div className="relative w-full h-36">
                  <Textarea
                    placeholder="继续提问..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-36 px-12 py-8 text-14 rounded-20 shadow-default border border-line-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  {/* 发送按钮 */}
                  <Button
                    variant="fill"
                    className="absolute bottom-[6px] right-[6px] w-24 h-24 p-0 rounded-16"
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() || isSearching}
                  >
                    <ArrowUpIcon variant="16" iconType="primary" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
