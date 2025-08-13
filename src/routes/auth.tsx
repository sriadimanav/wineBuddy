// routes/auth.tsx
import { createAuthGuard } from '@components/features/auth/authGuards';
import { AuthScreen } from '@components/features/auth/AuthScreen';
import { authService } from '@components/features/auth/authService';
import { createUserWithSamples } from '@components/utils/userUtils';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { User } from '@ts/index';

function AuthComponent() {
  const navigate = useNavigate();

  const handleLogin = async (user: User) => {
    try {
      // Ensure user has sample data if needed
      const userWithSamples = createUserWithSamples(user);

      // Save to localStorage
      authService.saveUser(userWithSamples);

      // Navigate to home
      navigate({ to: '/' });
    } catch (error) {
      console.error('Failed to complete login process:', error);
      // You might want to show an error message to the user here
    }
  };

  return <AuthScreen onLogin={handleLogin} />;
}

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    createAuthGuard();
  },
  component: AuthComponent,
});
