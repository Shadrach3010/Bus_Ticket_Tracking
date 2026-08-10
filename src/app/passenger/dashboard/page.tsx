import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { passengerDashboard } from "@/lib/dashboard-content";

export default function PassengerDashboardPage() {
  return <DashboardOverview title="Passenger Dashboard" data={passengerDashboard} />;
}
