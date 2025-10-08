"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormDialog } from '@/components/ui/form-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from '@/lib/hooks/use-form';
import supabase from '@/lib/supabase';

interface AuthDialogProps {
  onLogin: (userData?: { username: string }) => void;
}

export const AuthDialog = ({ onLogin }: AuthDialogProps) => {
  const { values, updateField, isOpen, handleOpenChange } = useForm({
    activeTab: "login",
    loginData: { email: '', password: '' },
    registerData: { username: '', email: '', password: '' }
  });

  const handleAuth = async (type: 'login' | 'register') => {
    try {
      const data = type === 'login' ? values.loginData : values.registerData;
      const authMethod = type === 'login'
        ? supabase.auth.signInWithPassword({ email: data.email, password: data.password })
        : supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: { data: { username: values.registerData.username || '用户' } }
        });

      const { error } = await authMethod;
      if (error) throw error;

      onLogin();
      handleOpenChange(false);
    } catch (error: any) {
      alert(`认证失败: ${error.message}`);
    }
  };

  return (
    <FormDialog
      trigger={
        <Button variant="line">
          立即登录
        </Button>
      }
      title="欢迎体验 Intelligent Web"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Tabs value={values.activeTab} onValueChange={(tab) => updateField('activeTab', tab)}>
        <TabsList>
          <TabsTrigger value="login">登录</TabsTrigger>
          <TabsTrigger value="register">注册</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <div>
            <h3>邮箱</h3>
            <Input
              type="email"
              placeholder="请输入邮箱"
              value={values.loginData.email}
              onChange={(e) => updateField('loginData', { ...values.loginData, email: e.target.value })}
            />
          </div>
          <div>
            <h3>密码</h3>
            <Input
              type="password"
              placeholder="请输入密码"
              value={values.loginData.password}
              onChange={(e) => updateField('loginData', { ...values.loginData, password: e.target.value })}
            />
          </div>
          <Button variant="fill" onClick={() => handleAuth('login')} className="w-full !mt-106">
            登录
          </Button>
        </TabsContent>

        <TabsContent value="register">
          <div>
            <h3>用户名</h3>
            <Input
              placeholder="请输入用户名"
              value={values.registerData.username}
              onChange={(e) => updateField('registerData', { ...values.registerData, username: e.target.value })}
            />
          </div>
          <div>
            <h3>邮箱</h3>
            <Input
              type="email"
              placeholder="请输入邮箱"
              value={values.registerData.email}
              onChange={(e) => updateField('registerData', { ...values.registerData, email: e.target.value })}
            />
          </div>
          <div>
            <h3>密码</h3>
            <Input
              type="password"
              placeholder="请输入密码"
              value={values.registerData.password}
              onChange={(e) => updateField('registerData', { ...values.registerData, password: e.target.value })}
            />
          </div>
          <Button onClick={() => handleAuth('register')} className="w-full !mt-24">
            注册并登录
          </Button>
        </TabsContent>
      </Tabs>
    </FormDialog>
  );
};
