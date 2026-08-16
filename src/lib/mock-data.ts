import type {
  AppRoute,
  DashboardMetric,
  DigitalTicket,
  FeatureHighlight,
  RolePreview,
} from "@/types";

export const appMetrics: DashboardMetric[] = [
  {
    label: "Boarding time",
    value: "Fast",
    helper: "QR and manual checks keep queues moving.",
  },
  {
    label: "Ticket format",
    value: "Digital",
    helper: "Each ticket carries a reference and QR code.",
  },
  {
    label: "Access",
    value: "Role based",
    helper: "Every user sees tools for their responsibilities.",
  },
];

export const sampleRoutes: AppRoute[] = [
  {
    id: "rt-001",
    origin: "Central Terminal",
    destination: "East Station",
    departureTime: "08:30 AM",
    duration: "45 min",
    fare: 35,
    status: "active",
  },
  {
    id: "rt-002",
    origin: "Waterfront",
    destination: "University Gate",
    departureTime: "09:15 AM",
    duration: "55 min",
    fare: 42,
    status: "active",
  },
  {
    id: "rt-003",
    origin: "Market Square",
    destination: "North Depot",
    departureTime: "10:00 AM",
    duration: "35 min",
    fare: 28,
    status: "scheduled",
  },
];

export const sampleTicket: DigitalTicket = {
  id: "ticket-001",
  reference: "BT-2026-0148",
  passengerName: "Aminata Kamara",
  route: "Central Terminal to East Station",
  origin: "Central Terminal",
  destination: "East Station",
  departureTime: "08:30 AM",
  travelDate: "Aug 16, 2026",
  fare: 35,
  seatNumber: "12A",
  busNumber: "BUS-18",
  status: "unused",
  purchasedAt: "2026-08-16 07:15",
  paymentMethod: "Orange Money",
};


export const featureHighlights: FeatureHighlight[] = [
  {
    title: "Online ticket purchase",
    description:
      "Passengers can choose a route, confirm fare details, and receive a digital ticket.",
  },
  {
    title: "QR verification",
    description:
      "Conductors can scan a ticket or enter its reference number when scanning is unavailable.",
  },
  {
    title: "Admin records",
    description:
      "Administrators can monitor routes, fares, payments, validations, and sales reports.",
  },
];

export const rolePreviews: RolePreview[] = [
  {
    role: "passenger",
    title: "Passenger Portal",
    description:
      "Buy tickets, view QR codes, download receipts, and track payment history.",
    href: "/passenger/dashboard",
    actions: ["View routes", "Buy ticket", "Open history"],
  },
  {
    role: "conductor",
    title: "Conductor Console",
    description:
      "Verify tickets quickly with QR scanning or a manual ticket reference.",
    href: "/conductor/dashboard",
    actions: ["Scan QR", "Check reference", "Mark used"],
  },
  {
    role: "administrator",
    title: "Admin Dashboard",
    description:
      "Manage users, routes, fares, sales records, verification logs, and reports.",
    href: "/admin/dashboard",
    actions: ["Manage routes", "Review payments", "Generate reports"],
  },
];
