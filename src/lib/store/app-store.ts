"use client";

import { useEffect, useState } from "react";
import type {
  AppRoute,
  BusItem,
  ConductorTrip,
  DigitalTicket,
  IncidentReport,
  ManifestPassenger,
  PaymentRecord,
  UserFeedback,
  ValidationAuditLog,
  AuthUser,
} from "@/types";

const STORAGE_KEY = "bus_ticket_tracking_system_v2";

export interface SystemState {
  routes: AppRoute[];
  buses: BusItem[];
  tickets: DigitalTicket[];
  payments: PaymentRecord[];
  trips: ConductorTrip[];
  manifestPassengers: ManifestPassenger[];
  incidentReports: IncidentReport[];
  feedbackList: UserFeedback[];
  validationLogs: ValidationAuditLog[];
  users: AuthUser[];
}

const defaultRoutes: AppRoute[] = [
  {
    id: "rt-001",
    origin: "Central Terminal",
    destination: "East Station",
    departureTime: "08:30 AM",
    duration: "45 min",
    distanceKm: 28,
    fare: 35,
    status: "active",
    stops: ["Central Terminal", "City Mall", "Hospital Junc.", "East Station"],
    operatingDays: "Mon - Sun",
    busAssigned: "BUS-18",
  },
  {
    id: "rt-002",
    origin: "Waterfront",
    destination: "University Gate",
    departureTime: "09:15 AM",
    duration: "55 min",
    distanceKm: 34,
    fare: 42,
    status: "active",
    stops: ["Waterfront", "Harbor Point", "Tech Park", "University Gate"],
    operatingDays: "Mon - Sat",
    busAssigned: "BUS-21",
  },
  {
    id: "rt-003",
    origin: "Market Square",
    destination: "North Depot",
    departureTime: "10:00 AM",
    duration: "35 min",
    distanceKm: 22,
    fare: 28,
    status: "active",
    stops: ["Market Square", "Civic Center", "Industrial Park", "North Depot"],
    operatingDays: "Mon - Sun",
    busAssigned: "BUS-14",
  },
  {
    id: "rt-004",
    origin: "Airport Junction",
    destination: "Downtown Express",
    departureTime: "11:30 AM",
    duration: "50 min",
    distanceKm: 40,
    fare: 50,
    status: "scheduled",
    stops: ["Airport Junction", "Toll Gate", "Financial Center", "Downtown Express"],
    operatingDays: "Daily",
    busAssigned: "BUS-09",
  },
];

const defaultBuses: BusItem[] = [
  {
    id: "BUS-18",
    plate: "SL-1842",
    model: "Mercedes-Benz Citaro (40 Seats)",
    capacity: 40,
    routeId: "rt-001",
    routeName: "Central Terminal to East Station",
    conductorId: "conductor-001",
    conductorName: "Mohamed Bangura",
    status: "In Service",
    amenities: ["High-speed WiFi", "Air Conditioning", "USB Charging", "CCTV"],
  },
  {
    id: "BUS-21",
    plate: "SL-2108",
    model: "Volvo 7900 Hybrid (45 Seats)",
    capacity: 45,
    routeId: "rt-002",
    routeName: "Waterfront to University Gate",
    conductorId: "conductor-002",
    conductorName: "Kadiatu Mansaray",
    status: "Ready",
    amenities: ["Air Conditioning", "Luggage Rack", "Wheelchair Ramp"],
  },
  {
    id: "BUS-14",
    plate: "SL-1405",
    model: "Scania Citywide (38 Seats)",
    capacity: 38,
    routeId: "rt-003",
    routeName: "Market Square to North Depot",
    conductorId: "conductor-003",
    conductorName: "Samuel Koroma",
    status: "In Service",
    amenities: ["Air Conditioning", "USB Charging"],
  },
  {
    id: "BUS-09",
    plate: "SL-0919",
    model: "Yutong Luxury Coach (50 Seats)",
    capacity: 50,
    routeId: "rt-004",
    routeName: "Airport Junction to Downtown Express",
    status: "Standby",
    amenities: ["High-speed WiFi", "Air Conditioning", "Reclining Seats", "Overhead Video"],
  },
];

const defaultTickets: DigitalTicket[] = [
  {
    id: "ticket-001",
    reference: "BT-2026-0148",
    passengerId: "passenger-001",
    passengerName: "Aminata Kamara",
    passengerPhone: "+23276123456",
    routeId: "rt-001",
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
  },
  {
    id: "ticket-002",
    reference: "BT-2026-0150",
    passengerId: "passenger-002",
    passengerName: "Ibrahim Sesay",
    passengerPhone: "+23276888999",
    routeId: "rt-001",
    route: "Central Terminal to East Station",
    origin: "Central Terminal",
    destination: "East Station",
    departureTime: "08:30 AM",
    travelDate: "Aug 16, 2026",
    fare: 35,
    seatNumber: "14B",
    busNumber: "BUS-18",
    status: "unused",
    purchasedAt: "2026-08-16 07:20",
    paymentMethod: "Africell Money",
  },
  {
    id: "ticket-003",
    reference: "BT-2026-0139",
    passengerId: "passenger-001",
    passengerName: "Aminata Kamara",
    passengerPhone: "+23276123456",
    routeId: "rt-003",
    route: "Market Square to North Depot",
    origin: "Market Square",
    destination: "North Depot",
    departureTime: "10:00 AM",
    travelDate: "Aug 14, 2026",
    fare: 28,
    seatNumber: "06C",
    busNumber: "BUS-14",
    status: "used",
    purchasedAt: "2026-08-14 09:10",
    validatedAt: "2026-08-14 09:55",
    validatedBy: "Samuel Koroma (Conductor)",
    paymentMethod: "Credit/Debit Card",
  },
  {
    id: "ticket-004",
    reference: "BT-2026-0165",
    passengerId: "passenger-003",
    passengerName: "Fatmata Jalloh",
    passengerPhone: "+23276555444",
    routeId: "rt-002",
    route: "Waterfront to University Gate",
    origin: "Waterfront",
    destination: "University Gate",
    departureTime: "09:15 AM",
    travelDate: "Aug 17, 2026",
    fare: 42,
    seatNumber: "04A",
    busNumber: "BUS-21",
    status: "unused",
    purchasedAt: "2026-08-15 14:30",
    paymentMethod: "Apple Pay",
  },
];

const defaultPayments: PaymentRecord[] = [
  {
    id: "PAY-9001",
    ticketReference: "BT-2026-0148",
    passengerName: "Aminata Kamara",
    passengerEmail: "passenger@example.com",
    route: "Central Terminal to East Station",
    amount: 35,
    method: "Orange Money",
    status: "Successful",
    date: "Aug 16, 2026 07:15",
    transactionRef: "OM-8839210",
  },
  {
    id: "PAY-9002",
    ticketReference: "BT-2026-0150",
    passengerName: "Ibrahim Sesay",
    passengerEmail: "ibrahim@example.com",
    route: "Central Terminal to East Station",
    amount: 35,
    method: "Africell Money",
    status: "Successful",
    date: "Aug 16, 2026 07:20",
    transactionRef: "AFM-449102",
  },
  {
    id: "PAY-9003",
    ticketReference: "BT-2026-0139",
    passengerName: "Aminata Kamara",
    passengerEmail: "passenger@example.com",
    route: "Market Square to North Depot",
    amount: 28,
    method: "Credit/Debit Card",
    status: "Successful",
    date: "Aug 14, 2026 09:10",
    transactionRef: "CC-901844",
  },
  {
    id: "PAY-9004",
    ticketReference: "BT-2026-0165",
    passengerName: "Fatmata Jalloh",
    passengerEmail: "fatmata@example.com",
    route: "Waterfront to University Gate",
    amount: 42,
    method: "Apple Pay",
    status: "Successful",
    date: "Aug 15, 2026 14:30",
    transactionRef: "AP-773192",
  },
];

const defaultTrips: ConductorTrip[] = [
  {
    id: "TRIP-301",
    tripNumber: "EXP-101",
    bus: "BUS-18",
    route: "Central Terminal to East Station",
    routeId: "rt-001",
    departureTime: "08:30 AM",
    estimatedArrival: "09:15 AM",
    status: "Boarding",
    totalSeats: 40,
    bookedSeats: 32,
    boardedCount: 21,
    currentStopIndex: 0,
    stops: ["Central Terminal", "City Mall", "Hospital Junc.", "East Station"],
  },
  {
    id: "TRIP-302",
    tripNumber: "EXP-102",
    bus: "BUS-21",
    route: "Waterfront to University Gate",
    routeId: "rt-002",
    departureTime: "09:15 AM",
    estimatedArrival: "10:10 AM",
    status: "Scheduled",
    totalSeats: 45,
    bookedSeats: 28,
    boardedCount: 0,
    currentStopIndex: 0,
    stops: ["Waterfront", "Harbor Point", "Tech Park", "University Gate"],
  },
  {
    id: "TRIP-303",
    tripNumber: "REG-204",
    bus: "BUS-14",
    route: "Market Square to North Depot",
    routeId: "rt-003",
    departureTime: "10:00 AM",
    estimatedArrival: "10:35 AM",
    status: "Scheduled",
    totalSeats: 38,
    bookedSeats: 19,
    boardedCount: 0,
    currentStopIndex: 0,
    stops: ["Market Square", "Civic Center", "Industrial Park", "North Depot"],
  },
];

const defaultManifest: ManifestPassenger[] = [
  {
    id: "P-101",
    name: "Aminata Kamara",
    phone: "+23276123456",
    ticketReference: "BT-2026-0148",
    seatNumber: "12A",
    destination: "East Station",
    isBoarded: false,
  },
  {
    id: "P-102",
    name: "Ibrahim Sesay",
    phone: "+23276888999",
    ticketReference: "BT-2026-0150",
    seatNumber: "14B",
    destination: "East Station",
    isBoarded: true,
  },
  {
    id: "P-103",
    name: "Mariatu Turay",
    phone: "+23276444111",
    ticketReference: "BT-2026-0172",
    seatNumber: "02A",
    destination: "Hospital Junc.",
    isBoarded: true,
    specialAssistance: true,
  },
  {
    id: "P-104",
    name: "Abu Bakarr Cole",
    phone: "+23276777222",
    ticketReference: "BT-2026-0188",
    seatNumber: "08C",
    destination: "City Mall",
    isBoarded: false,
  },
];

const defaultIncidentReports: IncidentReport[] = [
  {
    id: "REP-77",
    tripId: "TRIP-301",
    conductorName: "Mohamed Bangura",
    type: "Delay",
    severity: "Low",
    title: "Slight traffic congestion at City Mall junction",
    description: "Scheduled departure delayed by approx 6 minutes due to morning market traffic.",
    status: "Submitted",
    submittedAt: "Aug 16, 2026 08:35",
  },
  {
    id: "REP-76",
    tripId: "TRIP-299",
    conductorName: "Mohamed Bangura",
    type: "Fare Dispute",
    severity: "Medium",
    title: "Passenger presented expired student pass",
    description: "Resolved amicably after passenger purchased regular single fare ticket.",
    status: "Resolved",
    submittedAt: "Aug 15, 2026 16:40",
  },
];

const defaultFeedback: UserFeedback[] = [
  {
    id: "FB-001",
    passengerName: "Aminata Kamara",
    passengerEmail: "passenger@example.com",
    route: "Central Terminal to East Station",
    rating: 5,
    category: "Punctuality",
    comment: "The digital ticket QR scanner made boarding very swift. Bus was super clean and comfortable!",
    date: "Aug 15, 2026",
    status: "Reviewed",
  },
  {
    id: "FB-002",
    passengerName: "Samuel Bangura",
    passengerEmail: "samuel@example.com",
    route: "Waterfront to University Gate",
    rating: 4,
    category: "Booking Ease",
    comment: "Easy booking from my phone. Would appreciate a live GPS tracker for the bus arrival time.",
    date: "Aug 14, 2026",
    status: "Received",
  },
];

const defaultValidationLogs: ValidationAuditLog[] = [
  {
    id: "LOG-501",
    ticketReference: "BT-2026-0139",
    passengerName: "Aminata Kamara",
    route: "Market Square to North Depot",
    status: "Valid",
    timestamp: "Aug 14, 2026 09:55",
    conductorName: "Samuel Koroma",
    bus: "BUS-14",
  },
  {
    id: "LOG-502",
    ticketReference: "BT-2026-0120",
    passengerName: "Samuel Koroma",
    route: "North Depot",
    status: "Valid",
    timestamp: "Aug 14, 2026 10:02",
    conductorName: "Samuel Koroma",
    bus: "BUS-14",
  },
];

const defaultUsers: AuthUser[] = [
  {
    id: "passenger-001",
    firstName: "Aminata",
    lastName: "Kamara",
    name: "Aminata Kamara",
    email: "passenger@example.com",
    phone: "+23276123456",
    nationalId: "SL-PAS-992140",
    role: "passenger",
  },
  {
    id: "conductor-001",
    firstName: "Mohamed",
    lastName: "Bangura",
    name: "Mohamed Bangura",
    email: "conductor@example.com",
    phone: "+23276222333",
    nationalId: "SL-CND-441208",
    role: "conductor",
  },
  {
    id: "admin-001",
    firstName: "Man",
    lastName: "Conteh",
    name: "Man Conteh",
    email: "admin@example.com",
    phone: "+23276333444",
    nationalId: "SL-ADM-110099",
    role: "administrator",
  },
];

const initialDefaultState: SystemState = {
  routes: defaultRoutes,
  buses: defaultBuses,
  tickets: defaultTickets,
  payments: defaultPayments,
  trips: defaultTrips,
  manifestPassengers: defaultManifest,
  incidentReports: defaultIncidentReports,
  feedbackList: defaultFeedback,
  validationLogs: defaultValidationLogs,
  users: defaultUsers,
};

// In-memory global state for SSR and client sync
let globalState: SystemState = initialDefaultState;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // ignore
    }
  });
}

function loadSavedState(): SystemState {
  if (typeof window === "undefined") {
    return globalState;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...initialDefaultState, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load saved system state:", error);
  }
  return initialDefaultState;
}

function saveState(nextState: SystemState) {
  globalState = nextState;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }
  }
  notifyListeners();
}

// Ensure state is initialized on client
if (typeof window !== "undefined") {
  globalState = loadSavedState();
}

export function useAppStore() {
  const [state, setState] = useState<SystemState>(() => {
    if (typeof window !== "undefined") {
      return loadSavedState();
    }
    return globalState;
  });

  useEffect(() => {
    // Initial sync
    setState(loadSavedState());

    const handleChange = () => {
      setState({ ...globalState });
    };

    listeners.add(handleChange);
    window.addEventListener("storage", handleChange);

    return () => {
      listeners.delete(handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  return {
    ...state,
    bookTicket: (input: {
      passengerName: string;
      passengerPhone: string;
      routeId: string;
      travelDate: string;
      seatNumber: string;
      paymentMethod: DigitalTicket["paymentMethod"];
    }) => {
      const route = state.routes.find((r) => r.id === input.routeId) || state.routes[0];
      const reference = `BT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTicketId = `ticket-${Date.now()}`;
      
      const newTicket: DigitalTicket = {
        id: newTicketId,
        reference,
        passengerName: input.passengerName,
        passengerPhone: input.passengerPhone,
        routeId: route.id,
        route: `${route.origin} to ${route.destination}`,
        origin: route.origin,
        destination: route.destination,
        departureTime: route.departureTime,
        travelDate: input.travelDate,
        fare: route.fare,
        seatNumber: input.seatNumber,
        busNumber: route.busAssigned || "BUS-18",
        status: "unused",
        purchasedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
        paymentMethod: input.paymentMethod,
      };

      const newPayment: PaymentRecord = {
        id: `PAY-${Date.now().toString().slice(-5)}`,
        ticketReference: reference,
        passengerName: input.passengerName,
        route: `${route.origin} to ${route.destination}`,
        amount: route.fare,
        method: input.paymentMethod,
        status: "Successful",
        date: new Date().toISOString().replace("T", " ").slice(0, 16),
        transactionRef: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      };

      const newManifestItem: ManifestPassenger = {
        id: `P-${Date.now().toString().slice(-4)}`,
        name: input.passengerName,
        phone: input.passengerPhone,
        ticketReference: reference,
        seatNumber: input.seatNumber,
        destination: route.destination,
        isBoarded: false,
      };

      const nextState: SystemState = {
        ...state,
        tickets: [newTicket, ...state.tickets],
        payments: [newPayment, ...state.payments],
        manifestPassengers: [newManifestItem, ...state.manifestPassengers],
      };

      saveState(nextState);
      return newTicket;
    },

    validateTicket: (reference: string, conductorName = "Mohamed Bangura", bus = "BUS-18") => {
      const normalizedRef = reference.trim().toUpperCase();
      const ticket = state.tickets.find((t) => t.reference.toUpperCase() === normalizedRef);

      if (!ticket) {
        const auditLog: ValidationAuditLog = {
          id: `LOG-${Date.now()}`,
          ticketReference: normalizedRef,
          passengerName: "Unknown",
          route: "Unknown",
          status: "Invalid",
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
          conductorName,
          bus,
        };
        saveState({
          ...state,
          validationLogs: [auditLog, ...state.validationLogs],
        });
        return { success: false, reason: "invalid", message: `Ticket ${normalizedRef} was not found in the ticketing system database.` };
      }

      if (ticket.status === "used") {
        const auditLog: ValidationAuditLog = {
          id: `LOG-${Date.now()}`,
          ticketReference: normalizedRef,
          passengerName: ticket.passengerName,
          route: ticket.route,
          status: "Already Used",
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
          conductorName,
          bus,
        };
        saveState({
          ...state,
          validationLogs: [auditLog, ...state.validationLogs],
        });
        return {
          success: false,
          reason: "already_used",
          message: `Ticket ${normalizedRef} has ALREADY been validated on ${ticket.validatedAt || "earlier trip"} by ${ticket.validatedBy || "staff"}.`,
          ticket,
        };
      }

      if (ticket.status === "cancelled") {
        return { success: false, reason: "cancelled", message: `Ticket ${normalizedRef} was cancelled and is invalid for boarding.`, ticket };
      }

      // Mark as used
      const validatedTimestamp = new Date().toISOString().replace("T", " ").slice(0, 16);
      const updatedTickets = state.tickets.map((t) =>
        t.reference.toUpperCase() === normalizedRef
          ? {
              ...t,
              status: "used" as const,
              validatedAt: validatedTimestamp,
              validatedBy: `${conductorName} (${bus})`,
            }
          : t
      );

      // Update manifest
      const updatedManifest = state.manifestPassengers.map((m) =>
        m.ticketReference.toUpperCase() === normalizedRef ? { ...m, isBoarded: true } : m
      );

      // Update trip boarded count
      const updatedTrips = state.trips.map((tr) =>
        tr.bus === bus ? { ...tr, boardedCount: tr.boardedCount + 1 } : tr
      );

      const auditLog: ValidationAuditLog = {
        id: `LOG-${Date.now()}`,
        ticketReference: normalizedRef,
        passengerName: ticket.passengerName,
        route: ticket.route,
        status: "Valid",
        timestamp: validatedTimestamp,
        conductorName,
        bus,
      };

      const nextState: SystemState = {
        ...state,
        tickets: updatedTickets,
        manifestPassengers: updatedManifest,
        trips: updatedTrips,
        validationLogs: [auditLog, ...state.validationLogs],
      };

      saveState(nextState);
      return { success: true, reason: "valid", message: `Ticket ${normalizedRef} is VALID! Access granted for ${ticket.passengerName} (Seat ${ticket.seatNumber}).`, ticket };
    },

    cancelTicket: (ticketId: string) => {
      const target = state.tickets.find((t) => t.id === ticketId);
      if (!target || target.status !== "unused") return false;

      const updatedTickets = state.tickets.map((t) => (t.id === ticketId ? { ...t, status: "cancelled" as const } : t));
      const updatedPayments = state.payments.map((p) =>
        p.ticketReference === target.reference ? { ...p, status: "Refunded" as const } : p
      );

      saveState({
        ...state,
        tickets: updatedTickets,
        payments: updatedPayments,
      });
      return true;
    },

    addRoute: (route: Omit<AppRoute, "id">) => {
      const newRoute: AppRoute = {
        ...route,
        id: `rt-${Date.now().toString().slice(-4)}`,
      };
      saveState({ ...state, routes: [newRoute, ...state.routes] });
      return newRoute;
    },

    updateRoute: (id: string, updates: Partial<AppRoute>) => {
      const routes = state.routes.map((r) => (r.id === id ? { ...r, ...updates } : r));
      saveState({ ...state, routes });
    },

    deleteRoute: (id: string) => {
      const routes = state.routes.filter((r) => r.id !== id);
      saveState({ ...state, routes });
    },

    addBus: (bus: Omit<BusItem, "id">) => {
      const newBus: BusItem = {
        ...bus,
        id: `BUS-${Date.now().toString().slice(-2)}`,
      };
      saveState({ ...state, buses: [newBus, ...state.buses] });
      return newBus;
    },

    updateBus: (id: string, updates: Partial<BusItem>) => {
      const buses = state.buses.map((b) => (b.id === id ? { ...b, ...updates } : b));
      saveState({ ...state, buses });
    },

    deleteBus: (id: string) => {
      const buses = state.buses.filter((b) => b.id !== id);
      saveState({ ...state, buses });
    },

    updateTripStatus: (tripId: string, status: ConductorTrip["status"], currentStopIndex?: number) => {
      const trips = state.trips.map((t) =>
        t.id === tripId
          ? {
              ...t,
              status,
              currentStopIndex: currentStopIndex !== undefined ? currentStopIndex : t.currentStopIndex,
            }
          : t
      );
      saveState({ ...state, trips });
    },

    toggleManifestBoarded: (manifestId: string, isBoarded: boolean) => {
      const manifestPassengers = state.manifestPassengers.map((m) =>
        m.id === manifestId ? { ...m, isBoarded } : m
      );
      saveState({ ...state, manifestPassengers });
    },

    submitIncidentReport: (report: Omit<IncidentReport, "id" | "submittedAt" | "status">) => {
      const newReport: IncidentReport = {
        ...report,
        id: `REP-${Date.now().toString().slice(-4)}`,
        status: "Submitted",
        submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      };
      saveState({
        ...state,
        incidentReports: [newReport, ...state.incidentReports],
      });
      return newReport;
    },

    submitFeedback: (feedback: Omit<UserFeedback, "id" | "date" | "status">) => {
      const newFeedback: UserFeedback = {
        ...feedback,
        id: `FB-${Date.now().toString().slice(-4)}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Received",
      };
      saveState({
        ...state,
        feedbackList: [newFeedback, ...state.feedbackList],
      });
      return newFeedback;
    },

    resetToDefaults: () => {
      saveState(initialDefaultState);
    },
  };
}
