import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function PassengerTicketsPage() {
  return (
    <ResourcePage
      title="Tickets"
      description="Access digital tickets, QR references, and ticket status."
      actionLabel="Download ticket"
      rows={resourceRows.passengerTickets}
    />
  );
}
