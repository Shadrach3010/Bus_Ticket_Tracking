import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function AdminReportsPage() {
  return (
    <ResourcePage
      title="Reports"
      description="Review sales, validation, passenger, and route performance reports."
      actionLabel="Generate report"
      rows={resourceRows.adminReports}
    />
  );
}
