// hooks/useAuthForm.ts
import { useState } from 'react';

import { hasValidationErrors, validateAuthForm } from '@components/utils/authValidation';

import type { AuthFormData, AuthFormState, FormErrors } from '@ts/index';

const INITIAL_FORM_DATA: AuthFormData = {
  name: '',
  email: '',
  password: '',
};

export const useAuthForm = (isLogin: boolean) => {
  const [formState, setFormState] = useState<AuthFormState>({
    formData: { ...INITIAL_FORM_DATA },
    errors: {},
    isLoading: false,
    showPassword: false,
  });

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
      errors: { ...prev.errors, [field]: '' },
    }));
  };

  const togglePassword = () => {
    setFormState(prev => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const validateForm = (): boolean => {
    const errors = validateAuthForm(formState.formData, isLogin);
    setFormState(prev => ({ ...prev, errors }));
    return !hasValidationErrors(errors);
  };

  const setLoading = (loading: boolean) => {
    setFormState(prev => ({ ...prev, isLoading: loading }));
  };

  const resetForm = () => {
    setFormState({
      formData: { ...INITIAL_FORM_DATA },
      errors: {},
      isLoading: false,
      showPassword: false,
    });
  };

  const setErrors = (errors: FormErrors) => {
    setFormState(prev => ({ ...prev, errors }));
  };

  return {
    formState,
    handleInputChange,
    togglePassword,
    validateForm,
    setLoading,
    resetForm,
    setErrors,
  };
};
