// hooks/useProfileActions.ts
import { authService } from '@components/features/auth/authService';

export const useProfileActions = () => {
  const resetApp = () => {
    if (confirm('This will reset all app data and show onboarding again. Are you sure?')) {
      authService.clearUser();
      localStorage.removeItem('wine-buddy-onboarding-complete');
      window.location.href = '/';
    }
  };

  const handleCreateAccount = () => {
    // Remove current guest user and redirect to auth
    authService.clearUser();
    window.location.href = '/auth';
  };

  return {
    resetApp,
    handleCreateAccount,
  };
};
