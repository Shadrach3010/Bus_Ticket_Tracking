import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function AdminPassengersPage() {
  return (
    <ResourcePage
      title="Passengers"
      description="Manage passenger accounts, ticket activity, and access status."
      actionLabel="Add passenger"
      rows={resourceRows.adminPassengers}
    />
  );
}
