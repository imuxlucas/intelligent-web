// 项目类型定义
export interface Design {
  id: string;
  uploaded_at: string;
  name: string;
  uploader: string;
  introduction: string;
  tag: string;
  media: string;
  thinking?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  isLoggedIn: boolean;
}

export interface AuthState {
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
}

export interface UploadFormData {
  files: File[];
  title: string;
  tags: string;
  description: string;
}

export interface SearchFilters {
  searchTerm: string;
  selectedTags: string[];
}
