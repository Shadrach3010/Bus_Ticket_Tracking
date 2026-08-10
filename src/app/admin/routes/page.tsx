import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function AdminRoutesPage() {
  return (
    <ResourcePage
      title="Routes"
      description="Manage route origins, destinations, fares, and status."
      actionLabel="Add route"
      rows={resourceRows.adminRoutes}
    />
  );
}
