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

export type AuthUser = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  nationalId?: string;
  role: UserRole;
};

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
};

export type IconName =
  | "badgeCheck"
  | "barChart"
  | "bell"
  | "bus"
  | "calendar"
  | "creditCard"
  | "fileText"
  | "layoutDashboard"
  | "map"
  | "qrCode"
  | "receipt"
  | "route"
  | "settings"
  | "ticket"
  | "users";

export type DashboardNavItem = NavItem & {
  icon: IconName;
};

export type TableColumn<T> = {
  key: keyof T;
  label: string;
};
