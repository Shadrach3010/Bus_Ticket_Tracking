import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function PassengerBookingsPage() {
  return (
    <ResourcePage
      title="Bookings"
      description="View booked trips, upcoming journeys, and booking status."
      actionLabel="Book ticket"
      rows={resourceRows.passengerBookings}
    />
  );
}
