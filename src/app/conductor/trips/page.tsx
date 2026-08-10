import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function ConductorTripsPage() {
  return (
    <ResourcePage
      title="Trips"
      description="View today's schedule, assigned buses, and trip status."
      actionLabel="Update trip"
      rows={resourceRows.conductorTrips}
    />
  );
}
