export type UserRole = "passenger" | "conductor" | "administrator";

export type TicketStatus = "unused" | "used" | "invalid" | "cancelled";

export type RouteStatus = "active" | "scheduled" | "paused";

export type AppRoute = {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  duration: string;
  fare: number;
  status: RouteStatus;
};

export type DigitalTicket = {
  id: string;
  reference: string;
  passengerName: string;
  route: string;
  departureTime: string;
  travelDate: string;
  fare: number;
  status: TicketStatus;
};

export type DashboardMetric = {
  label: string;
  value: string;
  helper: string;
};

export type FeatureHighlight = {
  title: string;
  description: string;
};

export type RolePreview = {
  role: UserRole;
  title: string;
  description: string;
  href: string;
  actions: string[];
};

export type NavItem = {
  label: string;
  href: string;
};
