"use client";

import { useMemo, useState } from "react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const routeOptions = [
  { label: "Central Terminal → East Station", fare: 35 },
  { label: "Waterfront → University Gate", fare: 42 },
  { label: "Market Square → North Depot", fare: 28 },
];

export default function PassengerBookTicketPage() {
  const [selectedRoute, setSelectedRoute] = useState(routeOptions[0].label);
  const [date, setDate] = useState("2026-08-12");
  const [passengerName, setPassengerName] = useState("Aminata Kamara");
  const [phone, setPhone] = useState("+23276123456");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedFare = useMemo(
    () => routeOptions.find((route) => route.label === selectedRoute)?.fare ?? 35,
    [selectedRoute],
  );

  function handleConfirmBooking() {
    if (!selectedRoute || !date || !passengerName.trim()) {
      setError("Please complete the travel details before confirming.");
      setMessage("");
      return;
    }

    const reference = `BT-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
    setError("");
    setMessage(
      `Booking confirmed for ${passengerName}. Ticket ${reference} is ready for boarding on ${date}.`,
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Book a Ticket</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Select a route and confirm your travel details before paying.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip details</CardTitle>
          <CardDescription>Select the route and passenger information.</CardDescription>
        </CardHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="route" className="text-sm font-semibold text-slate-700">
              Route
            </label>
            <select
              id="route"
              value={selectedRoute}
              onChange={(event) => setSelectedRoute(event.target.value)}
              className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {routeOptions.map((route) => (
                <option key={route.label} value={route.label}>
                  {route.label} • NLe {route.fare}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Departure date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input
            label="Passenger name"
            value={passengerName}
            onChange={(event) => setPassengerName(event.target.value)}
          />
          <Input
            label="Phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        {error ? (
          <div className="mt-4">
            <Alert tone="error">{error}</Alert>
          </div>
        ) : null}

        {message ? (
          <div className="mt-4">
            <Alert tone="success">{message}</Alert>
          </div>
        ) : null}

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">Estimated fare</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">NLe {selectedFare}</p>
            </div>
            <Button type="button" onClick={handleConfirmBooking}>
              Confirm booking
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
