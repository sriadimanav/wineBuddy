// components/auth/AuthToggle.tsx
import type { AuthToggleProps } from '@ts/index';

export function AuthToggle({ isLogin, onToggle }: AuthToggleProps) {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button
          onClick={onToggle}
          className="ml-1 text-wine-accent hover:text-wine-light font-medium transition-colors">
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
}
