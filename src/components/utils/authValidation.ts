// utils/authValidation.ts
import { APP_CONFIG } from '@/config/app';

import type { AuthFormData, FormErrors } from '@ts/index';

export const validateAuthForm = (formData: AuthFormData, isLogin: boolean): FormErrors => {
  const errors: FormErrors = {};

  // Name validation (only for signup)
  if (!isLogin && !formData.name.trim()) {
    errors.name = 'Name is required';
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!APP_CONFIG.VALIDATION.EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < APP_CONFIG.VALIDATION.MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${APP_CONFIG.VALIDATION.MIN_PASSWORD_LENGTH} characters`;
  }

  return errors;
};

export const hasValidationErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
