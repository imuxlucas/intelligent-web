"use client";

import { useState } from 'react';
import { UploadIcon, TrashIcon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateUniqueFileName } from '@/lib/utils/design-utils';
import { uploadDesign, uploadFile, getFileUrl } from '@/lib/supabase';
import Image from 'next/image';
import type { Design, UploadFormData } from '@/lib/types';

interface UploadDialogProps {
  onAddDesign: (design: Design) => void;
  currentUser: { username: string; isLoggedIn: boolean };
}

export const UploadDialog = ({ onAddDesign, currentUser }: UploadDialogProps) => {
  const [formData, setFormData] = useState<UploadFormData>({
    files: [],
    title: '',
    tags: '',
    description: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // 重置表单数据
  const resetForm = () => {
    setFormData({
      files: [],
      title: '',
      tags: '',
      description: ''
    });
    setIsDragOver(false);
  };

  // 对话框打开时重置
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      resetForm();
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ ...prev, files: Array.from(files) }));
    }
  };

  // 处理标签字符串，将中文逗号转换为英文逗号
  const processTags = (tagString: string): string => {
    return tagString
      .replace(/，/g, ',') // 将中文逗号替换为英文逗号
      .split(',') // 按英文逗号分割
      .map(tag => tag.trim()) // 去除前后空格
      .filter(tag => tag.length > 0) // 过滤空标签
      .join(','); // 重新用英文逗号连接
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || formData.files.length === 0) {
      alert('请填写完整信息并上传至少一个文件');
      return;
    }

    if (!currentUser.isLoggedIn) {
      alert('请先登录后再上传案例');
      return;
    }

    try {
      let mediaUrl = "test.jpg";
      if (formData.files[0]) {
        const file = formData.files[0];
        const uniqueFileName = generateUniqueFileName(file);
        const uniqueFile = new File([file], uniqueFileName, { type: file.type });
        await uploadFile(uniqueFile);
        mediaUrl = await getFileUrl(`public/${uniqueFileName}`);
      }

      const newDesign: Design = {
        id: Date.now().toString(),
        uploaded_at: new Date().toISOString(),
        name: formData.title.trim(),
        uploader: currentUser.username,
        introduction: formData.description.trim(),
        tag: processTags(formData.tags), // 使用处理后的标签
        media: mediaUrl
      };

      await uploadDesign(newDesign);
      onAddDesign(newDesign);

      // 重置表单并关闭对话框
      resetForm();
      setIsOpen(false);
      alert('案例上传成功！');
    } catch (error: any) {
      alert(`上传失败: ${error?.message || '未知错误'}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          上传案例
        </Button>
      </DialogTrigger>
      <DialogContent
        size="md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>上传案例</DialogTitle>
        </DialogHeader>
        <div className="mb-16">
          <h3>选择文件</h3>
          {formData.files.length === 0 ? (
            <div
              className="border border-dashed rounded-8 p-23 text-center cursor-pointer border-line-default hover:bg-ghost-hover active:bg-ghost-active"
              onClick={() => document.getElementById('file-upload')?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
              onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleFileUpload(e.dataTransfer.files); }}
            >
              <UploadIcon variant="24" iconType="secondary" className="mb-8 mx-auto" />
              <p className="text-fg-secondary">拖拽文件到此处或点击选择</p>
              <p className="text-12 mt-4 text-fg-tertiary">支持 PNG, JPG, GIF, MP4, MOV, PDF 格式</p>
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*,.pdf"
                className="hidden"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </div>
          ) : (
            <div>
              {formData.files.map((file, index) => (
                <div key={index} className="relative w-full h-126 bg-bg-secondary rounded-8 flex items-center justify-center">
                  {file.type.startsWith('image/') ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width={400}
                      height={126}
                      className="w-full h-full object-contain rounded-8"
                    />
                  ) : (
                    <p>{file.name}</p>
                  )}
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }))}
                    className="absolute -top-8 -right-8 size-24 bg-error-default rounded-full flex items-center justify-center hover:bg-error-hover active:bg-error-active"
                  >
                    <TrashIcon variant="12" className="text-fg-opposite" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-16">
          <h3>标签</h3>
          <Input
            placeholder="添加标签，用逗号分隔"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          />
        </div>

        <div className="mb-16">
          <h3>产品名称</h3>
          <Input
            placeholder="这个案例来源于哪个产品呀"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <h3>亮点描述</h3>
          <Textarea
            placeholder="描述你认为的设计亮点"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <Button className="w-full !mt-6" onClick={handleSubmit}>
          上传案例
        </Button>
      </DialogContent>
    </Dialog>
  );
};
