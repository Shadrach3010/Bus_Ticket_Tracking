import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function PassengerRoutesPage() {
  return (
    <ResourcePage
      title="Routes"
      description="Browse available routes, departure times, and ticket fares."
      actionLabel="View schedule"
      rows={resourceRows.adminRoutes}
    />
  );
}
