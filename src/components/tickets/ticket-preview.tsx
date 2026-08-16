"use client";

import React, { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  QrCode,
  ArrowRight,
  Bus,
  User,
  CreditCard,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DigitalTicket } from "@/types";
import { useToast } from "@/components/ui/toast-provider";

// Helper to generate deterministic QR grid from ticket reference
function generateQrGrid(ref: string) {
  const seed = ref.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const size = 10;
  const grid: number[] = [];

  for (let i = 0; i < size * size; i++) {
    const row = Math.floor(i / size);
    const col = i % size;

    // Standard QR finder patterns in corners
    if (
      (row < 3 && col < 3) ||
      (row < 3 && col >= size - 3) ||
      (row >= size - 3 && col < 3)
    ) {
      if (
        (row === 0 || row === 2 || col === 0 || col === 2) && row < 3 && col < 3 ||
        (row === 0 || row === 2 || col === size - 1 || col === size - 3) && row < 3 && col >= size - 3 ||
        (row === size - 1 || row === size - 3 || col === 0 || col === 2) && row >= size - 3 && col < 3
      ) {
        grid.push(1);
      } else if ((row === 1 && col === 1) || (row === 1 && col === size - 2) || (row === size - 2 && col === 1)) {
        grid.push(1);
      } else {
        grid.push(0);
      }
    } else {
      // Deterministic noise based on character codes
      const val = (seed * (i + 13) + i * 37) % 100 > 45 ? 1 : 0;
      grid.push(val);
    }
  }
  return grid;
}

type TicketPreviewProps = {
  ticket: DigitalTicket;
  onCancel?: (ticketId: string) => void;
  showActions?: boolean;
};

export function TicketPreview({ ticket, onCancel, showActions = true }: TicketPreviewProps) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const qrCells = generateQrGrid(ticket.reference);

  const [origin, destination] = ticket.route.includes(" to ")
    ? ticket.route.split(" to ")
    : ticket.route.includes("→")
    ? ticket.route.split("→")
    : [ticket.origin || "Origin", ticket.destination || "Destination"];

  const getStatusBadge = () => {
    switch (ticket.status) {
      case "unused":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <BadgeCheck className="h-3.5 w-3.5" />
            Active Pass
          </span>
        );
      case "used":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Boarded & Used
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <XCircle className="h-3.5 w-3.5" />
            Cancelled / Refunded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <AlertCircle className="h-3.5 w-3.5" />
            {ticket.status}
          </span>
        );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Boarding Pass Downloaded", `Digital Ticket ${ticket.reference} PDF receipt generated.`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Ticket Ref: ${ticket.reference} - Route: ${ticket.route} - Seat: ${ticket.seatNumber}`);
    setCopied(true);
    toast.info("Ticket Copied to Clipboard", "Share reference with conductors or fellow passengers.");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <article
      id={`ticket-${ticket.id}`}
      className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl transition-all hover:shadow-2xl"
      aria-label={`Digital boarding pass for ${ticket.reference}`}
    >
      {/* Top Banner with Brand & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-4 py-3 sm:px-6 sm:py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30 shrink-0">
            <Bus className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <div>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-slate-400">
              Official Digital Boarding Pass
            </p>
            <h3 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
              {ticket.reference}
            </h3>
          </div>
        </div>
        <div className="self-start sm:self-auto">{getStatusBadge()}</div>
      </div>

      {/* Main Body */}
      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_auto]">

        {/* Left Side: Route and Passenger details */}
        <div className="space-y-5">
          {/* Route Visualizer */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Departure Origin
                </span>
                <p className="text-lg font-bold text-slate-900">{origin?.trim() || "Central Terminal"}</p>
                <p className="text-xs font-medium text-blue-600">Gate A • Platform 3</p>
              </div>

              <div className="flex flex-col items-center justify-center px-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="h-0.5 w-12 sm:w-20 bg-slate-300 border-dashed" />
                  <Bus className="h-4 w-4 text-blue-600 animate-pulse" />
                  <span className="h-0.5 w-12 sm:w-20 bg-slate-300 border-dashed" />
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                </div>
                <span className="mt-1 text-[11px] font-semibold text-slate-500">
                  {ticket.busNumber || "BUS-18"} Express
                </span>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Destination
                </span>
                <p className="text-lg font-bold text-slate-900">{destination?.trim() || "East Station"}</p>
                <p className="text-xs font-medium text-emerald-600">Terminal Arrival</p>
              </div>
            </div>
          </div>

          {/* Key Metadata Grid */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <User className="h-3.5 w-3.5 text-blue-600" />
                Passenger
              </dt>
              <dd className="mt-1 font-semibold text-slate-900 truncate">
                {ticket.passengerName}
              </dd>
            </div>

            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
                Travel Date
              </dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {ticket.travelDate}
              </dd>
            </div>

            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Clock3 className="h-3.5 w-3.5 text-blue-600" />
                Departure Time
              </dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {ticket.departureTime}
              </dd>
            </div>

            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <CreditCard className="h-3.5 w-3.5 text-blue-600" />
                Seat / Fare
              </dt>
              <dd className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold font-mono">
                  {ticket.seatNumber}
                </span>
                <span className="font-bold text-slate-900">
                  NLe {ticket.fare}
                </span>
              </dd>
            </div>
          </dl>

          {/* Validation Notice */}
          {ticket.status === "used" && ticket.validatedAt && (
            <div className="flex items-center gap-2 rounded-xl bg-blue-50/80 p-3 text-xs font-medium text-blue-900 border border-blue-100">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Validated by {ticket.validatedBy || "Conductor"} on {ticket.validatedAt}</span>
            </div>
          )}
        </div>

        {/* Right Side: QR Code & Verification Block */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 p-5 text-center min-w-[200px]">
          <div className="relative rounded-xl border-2 border-slate-900 bg-white p-3 shadow-md">
            <div
              aria-label={`QR verification code for ticket ${ticket.reference}`}
              className="grid h-36 w-36 grid-cols-10 gap-1 rounded-md bg-white"
            >
              {qrCells.map((cell, index) => (
                <span
                  key={`${ticket.id}-${index}`}
                  aria-hidden="true"
                  className={
                    cell
                      ? "rounded-[1px] bg-slate-950"
                      : "rounded-[1px] bg-transparent"
                  }
                />
              ))}
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <p className="font-mono text-xs font-bold tracking-wider text-slate-800">
              {ticket.reference}
            </p>
            <p className="text-[11px] text-slate-500">
              Present QR to conductor at bus entrance
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      {showActions && (
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-3.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Paid via {ticket.paymentMethod}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
              title="Share Ticket"
            >
              <Share2 className="h-3.5 w-3.5" />
              {copied ? "Copied!" : "Share"}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
              title="Print Pass"
            >
              <Printer className="h-3.5 w-3.5" />
              Print
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition shadow-sm"
              title="Download PDF"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>

            {ticket.status === "unused" && onCancel && (
              <button
                onClick={() => onCancel(ticket.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-sm ml-1"
                title="Cancel Booking"
              >
                Cancel Ticket
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
