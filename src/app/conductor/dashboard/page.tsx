import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { conductorDashboard } from "@/lib/dashboard-content";

export default function ConductorDashboardPage() {
  return <DashboardOverview title="Conductor Dashboard" data={conductorDashboard} />;
}
