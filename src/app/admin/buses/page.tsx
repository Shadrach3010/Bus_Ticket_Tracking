import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function AdminBusesPage() {
  return (
    <ResourcePage
      title="Buses"
      description="Track buses, plates, route assignments, and service state."
      actionLabel="Add bus"
      rows={resourceRows.adminBuses}
    />
  );
}
