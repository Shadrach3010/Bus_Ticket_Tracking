import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function ConductorTicketsPage() {
  return (
    <ResourcePage
      title="Ticket Validation"
      description="Validate ticket references and prepare QR scanning workflows."
      actionLabel="Validate ticket"
      rows={resourceRows.conductorTickets}
    />
  );
}
