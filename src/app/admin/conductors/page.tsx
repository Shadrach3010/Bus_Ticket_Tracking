import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function AdminConductorsPage() {
  return (
    <ResourcePage
      title="Conductors"
      description="Create conductor accounts and manage bus assignments."
      actionLabel="Add conductor"
      rows={resourceRows.adminConductors}
    />
  );
}
