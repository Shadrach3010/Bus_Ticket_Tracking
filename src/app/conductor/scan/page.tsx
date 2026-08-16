"use client";

import React, { useState } from "react";
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Camera,
  Search,
  User,
  Bus,
  MapPin,
  Clock,
  Sparkles,
  RefreshCw,
  Printer,
  History,
} from "lucide-react";

import { useAppStore } from "@/lib/store/app-store";
import { useToast } from "@/components/ui/toast-provider";
import { Button } from "@/components/ui/button";
import type { DigitalTicket } from "@/types";

export default function ConductorScanPage() {
  const store = useAppStore();
  const toast = useToast();

  const [referenceInput, setReferenceInput] = useState("BT-2026-0148");
  const [isScanning, setIsScanning] = useState(true);
  const [validationResult, setValidationResult] = useState<{
    status: "valid" | "used" | "invalid" | "cancelled" | "idle";
    message: string;
    ticket?: DigitalTicket;
  }>({
    status: "idle",
    message: "Ready to scan or verify passenger ticket.",
  });

  const handleValidate = (refToValidate?: string) => {
    const targetRef = (refToValidate || referenceInput).trim().toUpperCase();

    if (!targetRef) {
      toast.error("Reference Required", "Please enter or scan a ticket reference.");
      return;
    }

    const res = store.validateTicket(targetRef, "Mohamed Bangura", "BUS-18");

    if (res.success) {
      setValidationResult({
        status: "valid",
        message: res.message,
        ticket: res.ticket,
      });
      toast.success("Validation Success!", res.message);
    } else {
      if (res.reason === "already_used") {
        setValidationResult({
          status: "used",
          message: res.message,
          ticket: res.ticket,
        });
        toast.warning("Duplicate Scan Alert", res.message);
      } else if (res.reason === "cancelled") {
        setValidationResult({
          status: "cancelled",
          message: res.message,
          ticket: res.ticket,
        });
        toast.error("Cancelled Ticket", res.message);
      } else {
        setValidationResult({
          status: "invalid",
          message: res.message,
        });
        toast.error("Invalid Pass", res.message);
      }
    }
  };

  const handleQuickSampleScan = (ref: string) => {
    setReferenceInput(ref);
    handleValidate(ref);
  };

  const handlePrintSlip = () => {
    toast.info("Boarding Slip Printed", "Thermal receipt boarding slip printed for passenger.");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Conductor Scanner Console</h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time optical QR code verification and passenger manifest check-in for <strong className="text-slate-900">BUS-18</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            Scanner Active (Online Mode)
          </span>
        </div>
      </div>

      {/* Main Scanner Layout */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column: Camera / HUD Simulation */}
        <div className="space-y-6">
          {/* Scanner Viewfinder Box */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-slate-800 bg-slate-950 p-4 sm:p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Camera className="h-4 w-4" />
                Optical Camera HUD (60 FPS)
              </span>
              <span className="hidden sm:inline">Lens: 1080p Auto-Focus</span>
            </div>

            {/* Viewfinder Target Area */}
            <div className="relative my-4 sm:my-6 flex h-48 sm:h-64 items-center justify-center rounded-2xl border-2 border-dashed border-blue-500/50 bg-slate-900/60 p-4">
              {/* Corner Targeting Brackets */}

              <div className="absolute top-3 left-3 h-6 w-6 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
              <div className="absolute top-3 right-3 h-6 w-6 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 h-6 w-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 h-6 w-6 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />

              {/* Animated Laser Scanning Line */}
              {isScanning && (
                <div className="animate-laser absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
              )}

              <div className="text-center space-y-2">
                <QrCode className="mx-auto h-20 w-20 text-slate-600 animate-pulse" />
                <p className="text-xs font-semibold text-slate-300">
                  Align passenger QR code inside the target frame
                </p>
                <p className="text-[11px] text-slate-500">
                  Auto-detection takes &lt; 0.5s
                </p>
              </div>
            </div>

            {/* Quick Simulation Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Simulate Quick Test Scans:
              </span>
              <div className="flex flex-wrap gap-2">
                {store.tickets.slice(0, 3).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleQuickSampleScan(t.reference)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold transition border ${
                      t.status === "unused"
                        ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-800/40"
                        : "border-blue-500/40 bg-blue-950/40 text-blue-300 hover:bg-blue-800/40"
                    }`}
                  >
                    Scan {t.reference} ({t.status.toUpperCase()})
                  </button>
                ))}
                <button
                  onClick={() => handleQuickSampleScan("BT-INVALID-999")}
                  className="rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold border border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-800/40 transition"
                >
                  Scan Fake/Invalid Pass
                </button>
              </div>
            </div>
          </div>

          {/* Manual Reference Entry */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
            <label htmlFor="manual-ticket-ref" className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Manual Reference Lookup
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="manual-ticket-ref"
                  type="text"
                  value={referenceInput}
                  onChange={(e) => setReferenceInput(e.target.value)}
                  placeholder="Enter reference e.g. BT-2026-0148"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-3 py-2.5 text-sm font-mono font-bold text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none uppercase"
                />
              </div>
              <Button type="button" onClick={() => handleValidate()}>
                Validate Pass
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Validation Feedback & Verification Card */}
        <div className="space-y-6">
          {/* Validation Result Box */}
          <div
            className={`rounded-3xl border p-6 transition-all shadow-lg ${
              validationResult.status === "valid"
                ? "border-emerald-300 bg-emerald-50/90 text-emerald-950"
                : validationResult.status === "used"
                ? "border-amber-300 bg-amber-50/90 text-amber-950"
                : validationResult.status === "invalid" || validationResult.status === "cancelled"
                ? "border-rose-300 bg-rose-50/90 text-rose-950"
                : "border-slate-200 bg-white text-slate-800"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                {validationResult.status === "valid" ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                ) : validationResult.status === "used" ? (
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                ) : validationResult.status === "invalid" || validationResult.status === "cancelled" ? (
                  <XCircle className="h-6 w-6 text-rose-600" />
                ) : (
                  <QrCode className="h-6 w-6 text-blue-600" />
                )}
                <h2 className="text-xl font-extrabold">
                  {validationResult.status === "valid"
                    ? "VALID • ACCESS GRANTED"
                    : validationResult.status === "used"
                    ? "ALREADY VALIDATED"
                    : validationResult.status === "cancelled"
                    ? "TICKET CANCELLED"
                    : validationResult.status === "invalid"
                    ? "INVALID / NOT FOUND"
                    : "SCANNER READY"}
                </h2>
              </div>

              {validationResult.ticket && (
                <span className="rounded-lg bg-black/10 px-2.5 py-1 text-xs font-mono font-bold">
                  Seat {validationResult.ticket.seatNumber}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm font-medium leading-relaxed">
              {validationResult.message}
            </p>

            {/* Passenger Details Breakdown */}
            {validationResult.ticket && (
              <div className="mt-5 space-y-3 rounded-2xl bg-white/80 p-4 text-xs font-medium text-slate-800 shadow-sm border border-slate-200/60">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block font-normal">Passenger Name:</span>
                    <strong className="text-slate-950 text-sm">{validationResult.ticket.passengerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-normal">Seat Allocation:</span>
                    <strong className="font-mono text-blue-700 text-sm">{validationResult.ticket.seatNumber} (Coach Row)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-normal">Destination:</span>
                    <strong className="text-slate-950">{validationResult.ticket.destination || validationResult.ticket.route}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-normal">Departure Time:</span>
                    <strong className="text-slate-950">{validationResult.ticket.departureTime}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Paid via {validationResult.ticket.paymentMethod} (NLe {validationResult.ticket.fare})
                  </span>
                  <button
                    onClick={handlePrintSlip}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print Boarding Slip
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Validation Audit Stream */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <History className="h-4 w-4 text-slate-500" />
              Live Shift Validation Logs ({store.validationLogs.length})
            </h3>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
              {store.validationLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-2.5"
                >
                  <div>
                    <span className="font-mono font-bold text-slate-900">{log.ticketReference}</span>
                    <p className="text-[11px] text-slate-500">{log.passengerName} • {log.timestamp}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                      log.status === "Valid"
                        ? "bg-emerald-100 text-emerald-800"
                        : log.status === "Already Used"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
