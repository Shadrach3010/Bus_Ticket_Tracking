import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function ConductorReportsPage() {
  return (
    <ResourcePage
      title="Reports"
      description="Submit trip reports and review recent conductor activity."
      actionLabel="Submit report"
      rows={resourceRows.conductorReports}
    />
  );
}
