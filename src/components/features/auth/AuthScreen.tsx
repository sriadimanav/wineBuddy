// components/AuthScreen.tsx
import { useState } from 'react';

import { useScreenSize } from '@/components/hooks/useMediaQueries';
import { APP_CONFIG } from '@/config/app';
import { delay } from '@/utils/asyncUtils';

import {
  createGuestUser,
  createUserWithSamples,
  extractNameFromEmail,
} from '@components/utils/userUtils';

import type { AuthScreenProps, User } from '@ts/index';

import { AuthForm } from './AuthForm';
import { AuthHeader } from './AuthHeader';
import { AuthToggle } from './AuthToggle';
import { GuestLoginButton } from './GuestLoginButton';
import { useAuthForm } from './useAuthForm';

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const screenSize = useScreenSize();

  const { formState, handleInputChange, togglePassword, validateForm, setLoading, resetForm } =
    useAuthForm(isLogin);

  const handleSubmit = async (formData: typeof formState.formData) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await delay(APP_CONFIG.DEMO_DELAY.AUTH);

      const baseUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || extractNameFromEmail(formData.email),
        email: formData.email,
        favorites: [],
        streakCount: 0,
        totalScans: 0,
        badges: [],
      };

      const userWithSamples = createUserWithSamples(baseUser);
      onLogin(userWithSamples);
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);

    try {
      // Simulate brief loading
      await delay(APP_CONFIG.DEMO_DELAY.GUEST_LOGIN);

      const guestUser = createGuestUser();
      onLogin(guestUser);
    } catch (error) {
      console.error('Guest login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine-darkest via-wine-dark to-wine-medium flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
        <div className="absolute bottom-1/3 left-2/3 w-20 h-20 rounded-full bg-white"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <AuthHeader screenSize={screenSize} />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2
              className={`font-bold text-gray-900 mb-2 ${
                screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
              }`}>
              {isLogin ? 'Welcome' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? 'Sign in to continue your wine journey'
                : 'Start your wine discovery adventure'}
            </p>
          </div>

          <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            formState={formState}
            onInputChange={handleInputChange}
            onTogglePassword={togglePassword}
          />

          {/* Toggle Mode */}
          <AuthToggle isLogin={isLogin} onToggle={toggleMode} />

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500 bg-white">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Guest Login */}
          <GuestLoginButton
            onGuestLogin={handleGuestLogin}
            isLoading={formState.isLoading}
            screenSize={screenSize}
          />
        </div>

        {/* Demo Note */}
        <div className="mt-6 text-center">
          <p className="text-wine-light text-sm">
            This is a demo app. Use any email and password to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
