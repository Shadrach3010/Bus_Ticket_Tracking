import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function AdminAnalyticsPage() {
  return (
    <ResourcePage
      title="Analytics"
      description="Track daily ridership, sales, and validation trends across the transport network."
      actionLabel="Export summary"
      rows={resourceRows.adminReports}
    />
  );
}
