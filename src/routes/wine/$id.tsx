// routes/wine/$id.tsx
import { createFileRoute } from '@tanstack/react-router';

import { requireAuth, requireOnboarding } from '@components/features/auth/authGuards';
import { WineDetailScreen } from '@components/features/wineDetail/WineDetailScreen';

function WineDetailComponent() {
  const { id } = Route.useParams();

  return <WineDetailScreen id={id} />;
}

export const Route = createFileRoute('/wine/$id')({
  beforeLoad: () => {
    requireOnboarding();
    requireAuth();
  },
  component: WineDetailComponent,
});
