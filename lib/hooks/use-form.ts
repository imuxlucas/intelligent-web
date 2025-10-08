import { useState, useCallback } from 'react';

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [isOpen, setIsOpen] = useState(false);

  const updateField = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (open) resetForm();
  }, [resetForm]);

  return {
    values,
    setValues,
    updateField,
    resetForm,
    isOpen,
    setIsOpen,
    handleOpenChange
  };
};
