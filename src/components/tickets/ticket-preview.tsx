import { BadgeCheck, CalendarDays, Clock3, QrCode, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { DigitalTicket } from "@/types";

const qrCells = [
  1, 1, 1, 1, 0, 1, 0, 1, 1, 0,
  1, 0, 0, 1, 0, 1, 1, 0, 1, 1,
  1, 0, 1, 1, 1, 0, 0, 1, 0, 1,
  1, 1, 0, 0, 1, 1, 1, 0, 1, 0,
  0, 1, 1, 1, 0, 0, 1, 1, 1, 1,
  1, 0, 1, 0, 1, 1, 0, 0, 1, 0,
  0, 1, 0, 1, 1, 0, 1, 1, 0, 1,
  1, 1, 1, 0, 0, 1, 1, 0, 1, 1,
  1, 0, 0, 1, 1, 1, 0, 1, 0, 1,
  0, 1, 1, 0, 1, 0, 1, 1, 1, 0,
];

type TicketPreviewProps = {
  ticket: DigitalTicket;
};

export function TicketPreview({ ticket }: TicketPreviewProps) {
  return (
    <article
      id="ticket-preview"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      aria-label={`Digital ticket preview for ${ticket.reference}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">
            Digital ticket
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">
            {ticket.reference}
          </h2>
        </div>
        <Badge tone="green">
          <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
          Unused
        </Badge>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div
            aria-label={`QR code for ticket ${ticket.reference}`}
            className="grid h-36 w-36 grid-cols-10 gap-1 rounded-md bg-white p-2"
          >
            {qrCells.map((cell, index) => (
              <span
                key={`${ticket.id}-${index}`}
                aria-hidden="true"
                className={
                  cell ? "rounded-sm bg-slate-950" : "rounded-sm bg-white"
                }
              />
            ))}
          </div>
        </div>

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-slate-500">Passenger</dt>
            <dd className="font-semibold text-slate-950">
              {ticket.passengerName}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-slate-500">
              <Route aria-hidden="true" className="h-4 w-4" />
              Route
            </dt>
            <dd className="font-semibold text-slate-950">{ticket.route}</dd>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <dt className="flex items-center gap-2 text-slate-500">
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                Date
              </dt>
              <dd className="font-semibold text-slate-950">
                {ticket.travelDate}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-slate-500">
                <Clock3 aria-hidden="true" className="h-4 w-4" />
                Time
              </dt>
              <dd className="font-semibold text-slate-950">
                {ticket.departureTime}
              </dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800">
        <QrCode aria-hidden="true" className="h-4 w-4 shrink-0" />
        Manual fallback: conductors can verify with {ticket.reference}.
      </div>
    </article>
  );
}
