import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function ConductorPassengersPage() {
  return (
    <ResourcePage
      title="Passengers"
      description="Manage passengers assigned to active and scheduled trips."
      actionLabel="View manifest"
      rows={resourceRows.conductorPassengers}
    />
  );
}
