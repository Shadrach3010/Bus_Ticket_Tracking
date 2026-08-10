import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { adminDashboard } from "@/lib/dashboard-content";

export default function AdminDashboardPage() {
  return <DashboardOverview title="Administrator Dashboard" data={adminDashboard} />;
}
