import type { Design } from '@/lib/types';

// 设计相关工具函数
export const generateUniqueFileName = (file: File) => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const fileExtension = file.name.split('.').pop();
  return `${timestamp}-${randomId}.${fileExtension}`;
};

// 缓存处理过的标签，避免重复计算
const tagCache = new Map<string, string[]>();

const processTags = (tagString: string): string[] => {
  if (tagCache.has(tagString)) {
    return tagCache.get(tagString)!;
  }

  const result = tagString
    .replace(/，/g, ',') // 将中文逗号替换为英文逗号
    .split(',') // 按英文逗号分割
    .map(tag => tag.trim()) // 去除前后空格
    .filter(tag => tag.length > 0); // 过滤空标签

  tagCache.set(tagString, result);
  return result;
};

export const filterDesigns = (designs: Design[], searchTerm: string, selectedTags: string[]) => {
  return designs.filter(design => {
    // 如果没有搜索词，只按标签筛选
    if (!searchTerm.trim()) {
      const designTags = processTags(design.tag);
      return selectedTags.length === 0 || selectedTags.some(tag => designTags.includes(tag));
    }

    const searchLower = searchTerm.toLowerCase().trim();

    // 搜索产品名称
    const nameMatch = design.name.toLowerCase().includes(searchLower);

    // 搜索亮点描述
    const introMatch = design.introduction.toLowerCase().includes(searchLower);

    // 搜索上传者昵称
    const uploaderMatch = design.uploader.toLowerCase().includes(searchLower);

    // 搜索标签
    const designTags = processTags(design.tag);
    const tagMatch = designTags.some(tag => tag.toLowerCase().includes(searchLower));

    // 搜索匹配（任一字段匹配即可）
    const searchMatch = nameMatch || introMatch || uploaderMatch || tagMatch;

    // 标签筛选
    const tagFilterMatch = selectedTags.length === 0 || selectedTags.some(tag => designTags.includes(tag));

    return searchMatch && tagFilterMatch;
  });
};

export const getAllTags = (designs: Design[]) => {
  const tags = Array.from(new Set(designs.flatMap(design => processTags(design.tag))));
  // 随机打乱标签顺序
  return tags.sort(() => Math.random() - 0.5);
};
