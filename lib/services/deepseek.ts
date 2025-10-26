import { createClient } from '@/lib/supabase/client';

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function analyzeDesignWithAI(designData: {
  id: string;
  name: string;
  introduction: string;
  tag: string;
  media: string;
}): Promise<string> {
  const isVideo = designData.media.toLowerCase().endsWith('.mp4');
  const isGif = designData.media.toLowerCase().endsWith('.gif');
  const mediaType = isVideo ? '视频' : isGif ? '动图' : '图片';

  const mediaSpecificPrompt = isVideo
    ? `作为视频设计，请特别关注：视频节奏、转场效果、音画同步、动态构图、时间轴设计`
    : isGif
      ? `作为动图设计，请特别关注：循环动画、关键帧设计、动效细节、视觉冲击力、信息传达效率`
      : `作为静态图片，请特别关注：构图平衡、视觉层次、色彩对比、细节处理、整体和谐性`;

  const prompt = `你是一位资深的设计分析师，请对以下设计案例进行深度视觉分析：

【设计案例信息】
产品名称：${designData.name}
产品描述：${designData.introduction}
产品标签：${designData.tag}
媒体类型：${mediaType}

【分析要求】
请基于设计案例的视觉内容进行专业分析，重点关注：

1. **视觉设计分析**
   - 色彩搭配与调性（主色调、辅助色、色彩情感）
   - 布局结构与层次（构图方式、视觉重心、空间利用）
   - 字体与排版（字体选择、字号层次、文字排版）
   - 图形元素（图标、插画、装饰元素的使用）

2. **交互体验分析**
   - 用户操作流程的合理性
   - 信息架构的清晰度
   - 视觉引导与用户路径
   - 反馈机制的设计

3. **品牌表达分析**
   - 品牌调性的体现
   - 目标用户群体的定位
   - 情感化设计的运用
   - 差异化竞争优势

4. **技术实现分析**
   - 动效设计的流畅性（如果是动图/视频）
   - 响应式设计的适配
   - 性能优化的考虑
   - 技术创新的亮点

5. **整体评价**
   - 设计完成度与专业度
   - 用户体验的友好性
   - 商业价值的体现
   - 改进建议

【特别提醒】
${mediaSpecificPrompt}

请用专业而感性的语言，结合具体的设计细节进行分析，避免泛泛而谈。分析要生动有趣，不超过400字。`;

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-b43b5b251b614a1e81a87fe081ca9a1a`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 600,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    const analysis = data.choices[0]?.message?.content || '分析生成失败';

    // 保存分析结果到 Supabase
    try {
      const supabase = createClient();
      console.log('准备保存分析结果到数据库:', {
        id: designData.id,
        analysisLength: analysis.length,
        analysisPreview: analysis.substring(0, 100) + '...'
      });

      // 先检查记录是否存在
      const { data: existingData, error: selectError } = await supabase
        .from('designs')
        .select('id')
        .eq('id', designData.id)
        .single();

      if (selectError) {
        console.error('查找记录失败:', selectError);
        throw new Error('找不到对应的设计记录');
      }

      // 更新 thinking 字段
      const { data: updateData, error: updateError } = await supabase
        .from('designs')
        .update({ thinking: analysis })
        .eq('id', designData.id)
        .select('id, thinking');

      if (updateError) {
        console.error('保存分析结果失败:', updateError);
        console.error('错误详情:', {
          message: updateError.message,
          details: updateError.details,
          hint: updateError.hint,
          code: updateError.code
        });
        throw new Error(`保存失败: ${updateError.message}`);
      } else {
        console.log('分析结果保存成功:', updateData);
      }
    } catch (dbError) {
      console.error('数据库操作失败:', dbError);
      // 即使数据库保存失败，也返回分析结果给用户
    }

    return analysis;
  } catch (error) {
    console.error('DeepSeek API 错误:', error);
    throw new Error('AI分析服务暂时不可用，请稍后重试');
  }
}
