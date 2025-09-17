'use client';

import LookerStudioDashboard from '@/components/dashboard/LookerStudioDashboard';

export default function MetricasPage() {
  const dashboardSrc = process.env.NEXT_PUBLIC_LOOKER_STUDIO_URL || "";

  // Renderiza directamente el componente del dashboard para que ocupe todo el espacio
  return <LookerStudioDashboard src={dashboardSrc} />;
}
