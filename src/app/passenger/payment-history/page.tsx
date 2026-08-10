import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function PassengerPaymentHistoryPage() {
  return (
    <ResourcePage
      title="Payment History"
      description="Review payment records, receipts, and fare amounts."
      actionLabel="Export receipt"
      rows={resourceRows.passengerPayments}
    />
  );
}
