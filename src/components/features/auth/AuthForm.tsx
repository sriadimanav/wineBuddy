// components/auth/AuthForm.tsx
import { Eye, EyeOff, Lock, Mail, User as UserIcon } from 'lucide-react';

import { useScreenSize } from '@/components/hooks/useMediaQueries';

import type { AuthFormProps } from '@ts/index';

export function AuthForm({
  isLogin,
  onSubmit,
  formState,
  onInputChange,
  onTogglePassword,
}: AuthFormProps) {
  const screenSize = useScreenSize();
  const { formData, errors, isLoading } = formState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field (Sign Up Only) */}
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.name}
              onChange={e => onInputChange('name', e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-wine-accent focus:border-transparent transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
      )}

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={formData.email}
            onChange={e => onInputChange('email', e.target.value)}
            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-wine-accent focus:border-transparent transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={formState.showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={e => onInputChange('password', e.target.value)}
            className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-wine-accent focus:border-transparent transition-all ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {formState.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-wine-accent hover:bg-wine-light text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
          screenSize === 'kiosk' ? 'py-4 text-lg' : 'py-3'
        }`}>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            {isLogin ? 'Signing In...' : 'Creating Account...'}
          </div>
        ) : isLogin ? (
          'Sign In'
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}
