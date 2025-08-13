// types/auth.ts
import type { User } from './user';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
}

export interface AuthFormData {
  name: string;
  email: string;
  password: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface AuthFormState {
  formData: AuthFormData;
  errors: FormErrors;
  isLoading: boolean;
  showPassword: boolean;
}

export interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (formData: AuthFormData) => Promise<void>;
  formState: AuthFormState;
  onInputChange: (field: keyof AuthFormData, value: string) => void;
  onTogglePassword: () => void;
}

export interface GuestLoginProps {
  onGuestLogin: () => Promise<void>;
  isLoading: boolean;
  screenSize: string;
}

export interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}
