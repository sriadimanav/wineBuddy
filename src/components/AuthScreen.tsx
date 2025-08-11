import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Wine } from 'lucide-react'

import type { User } from '@routes/__root'
import { useScreenSize } from '@hooks/useMediaQuery'

interface AuthScreenProps {
  onLogin: (user: User) => void
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const screenSize = useScreenSize()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      favorites: [],
      streakCount: 0,
      totalScans: 0,
      badges: [],
    }

    setIsLoading(false)
    onLogin(user)
  }

  const handleGuestLogin = async () => {
    setIsLoading(true)

    // Simulate brief loading
    await new Promise((resolve) => setTimeout(resolve, 500))

    const guestUser: User = {
      id: 'guest-' + Math.random().toString(36).substr(2, 9),
      name: 'Wine Explorer',
      email: 'guest@winebuddy.com',
      favorites: ['1', '2', '3', '5'], // Sample favorites for guest users
      streakCount: 3,
      totalScans: 12,
      badges: ['first-scan', 'wine-explorer'],
      isGuest: true,
    }

    setIsLoading(false)
    onLogin(guestUser)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setErrors({})
    setFormData({ name: '', email: '', password: '' })
  }

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
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-2xl mb-4">
            <Wine className="w-10 h-10 text-wine-accent" />
          </div>
          <h1
            className={`font-bold text-white mb-2 ${
              screenSize === 'kiosk' ? 'text-4xl' : 'text-3xl'
            }`}
          >
            Wine Buddy
          </h1>
          <p
            className={`text-white/80 ${
              screenSize === 'kiosk' ? 'text-lg' : 'text-base'
            }`}
          >
            Your wine discovery companion
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2
              className={`font-bold text-gray-900 mb-2 ${
                screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
              }`}
            >
              {isLogin ? 'Welcome' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? 'Sign in to continue your wine journey'
                : 'Start your wine discovery adventure'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-wine-accent focus:border-transparent transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-wine-accent focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)
                  }
                  className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-wine-accent focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-wine-accent hover:bg-wine-light text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                screenSize === 'kiosk' ? 'py-4 text-lg' : 'py-3'
              }`}
            >
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

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={toggleMode}
                className="ml-1 text-wine-accent hover:text-wine-light font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500 bg-white">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Guest Login */}
          <div className="mt-6">
            <button
              onClick={handleGuestLogin}
              disabled={isLoading}
              className={`w-full border-2 border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:border-wine-accent hover:text-wine-accent disabled:opacity-50 disabled:cursor-not-allowed ${
                screenSize === 'kiosk' ? 'py-4 text-lg' : 'py-3'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Getting Started...
                </div>
              ) : (
                'Continue as Guest'
              )}
            </button>
            <p className="mt-2 text-xs text-gray-500 text-center">
              Explore the app without creating an account. You can sign up later
              to save your progress.
            </p>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-6 text-center">
          <p className="text-wine-light text-sm">
            This is a demo app. Use any email and password to continue.
          </p>
        </div>
      </div>
    </div>
  )
}
