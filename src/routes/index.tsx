// routes/index.tsx
import { requireAuth, requireOnboarding } from '@components/features/auth/authGuards';
import { authService } from '@components/features/auth/authService';
import { HomeScreen } from '@components/features/home/HomeScreen';
import { createUserWithSamples } from '@components/utils/userUtils';
import { createFileRoute } from '@tanstack/react-router';

function HomeComponent() {
  // Get user from auth service
  let user = authService.getUser();

  if (!user) {
    // This should never happen since beforeLoad handles the routing logic
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-wine-accent text-center">
          <div className="w-8 h-8 mb-2 mx-auto">🍷</div>
          <p className="text-sm text-muted-foreground">Setting up your wine journey...</p>
        </div>
      </div>
    );
  }

  // Migration: Add sample data for existing users who don't have any
  if (!user.favorites || user.favorites.length === 0) {
    user = createUserWithSamples(user);
    authService.saveUser(user);
  }

  return <HomeScreen user={user} />;
}

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    requireOnboarding();
    requireAuth();
  },
  component: HomeComponent,
});
