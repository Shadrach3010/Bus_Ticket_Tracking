import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  QrCode,
  ShieldCheck,
  TicketCheck,
  Timer,
  Users,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { TicketPreview } from "@/components/tickets/ticket-preview";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { appConfig } from "@/lib/constants";
import {
  appMetrics,
  featureHighlights,
  rolePreviews,
  sampleRoutes,
  sampleTicket,
} from "@/lib/mock-data";
import type { UserRole } from "@/types";

const roleIcons: Record<UserRole, LucideIcon> = {
  passenger: TicketCheck,
  conductor: QrCode,
  administrator: LayoutDashboard,
};

const platformValues = [
  {
    title: "Secure access",
    description: "Separate passenger, conductor, and administrator journeys.",
    icon: ShieldCheck,
  },
  {
    title: "Payment records",
    description: "Fare display, payment history, and receipts fit the flow.",
    icon: CreditCard,
  },
  {
    title: "Live operations",
    description: "Ticket status, validations, and reports are ready to update.",
    icon: Wifi,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main id="main-content">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
            <div className="flex flex-col justify-center">
              <Badge tone="blue" className="w-fit">
                <Timer aria-hidden="true" className="h-3.5 w-3.5" />
                Paperless bus ticketing
              </Badge>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {appConfig.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Buy bus tickets online, receive a digital ticket with a unique
                reference and QR code, and let conductors verify authenticity
                before boarding.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/register" icon={ArrowRight}>
                  Start as passenger
                </ButtonLink>
                <ButtonLink href="/login" variant="secondary" icon={ShieldCheck}>
                  Login to portal
                </ButtonLink>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {appMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-normal text-slate-500">
                      {metric.label}
                    </dt>
                    <dd className="mt-2 text-2xl font-bold text-slate-950">
                      {metric.value}
                    </dd>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {metric.helper}
                    </p>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid content-center gap-4">
              <TicketPreview ticket={sampleTicket} />
              <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-300">
                      Conductor verification
                    </p>
                    <p className="mt-1 text-2xl font-bold">Valid ticket</p>
                  </div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                    <BadgeCheck aria-hidden="true" className="h-6 w-6" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Scan a QR code or enter a ticket reference number to confirm
                  passenger access.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="routes"
          className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge tone="orange" className="w-fit">
                Route catalog
              </Badge>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Available routes and fares
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Current route samples are ready to connect to Next.js route
              handlers as the application data layer grows.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.7fr] gap-4 border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 max-md:hidden">
              <span>Route</span>
              <span>Departure</span>
              <span>Duration</span>
              <span>Fare</span>
            </div>
            <div className="divide-y divide-slate-200">
              {sampleRoutes.map((route) => (
                <article
                  key={route.id}
                  className="grid gap-3 px-4 py-4 md:grid-cols-[1.4fr_1fr_0.8fr_0.7fr] md:items-center"
                >
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      {route.origin} to {route.destination}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{route.id}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    {route.departureTime}
                  </p>
                  <p className="text-sm text-slate-600">{route.duration}</p>
                  <p className="text-sm font-bold text-slate-950">
                    NLe {route.fare}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
            {featureHighlights.map((feature) => (
              <article
                key={feature.title}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <BarChart3 aria-hidden="true" className="h-5 w-5 text-blue-600" />
                <h2 className="mt-4 text-lg font-bold text-slate-950">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="roles"
          className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl">
            <Badge tone="green" className="w-fit">
              Role-based access
            </Badge>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Three focused workspaces
            </h2>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {rolePreviews.map((preview) => {
              const Icon = roleIcons[preview.role];

              return (
                <article
                  key={preview.role}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    {preview.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {preview.description}
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {preview.actions.map((action) => (
                      <li
                        key={action}
                        className="flex items-center gap-2 text-sm font-medium text-slate-700"
                      >
                        <BadgeCheck
                          aria-hidden="true"
                          className="h-4 w-4 text-green-600"
                        />
                        {action}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={preview.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-blue-700 transition hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Open workspace
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="accessibility"
          className="border-t border-slate-200 bg-slate-950 text-white"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <Badge
                tone="blue"
                className="border-blue-400 bg-blue-500 text-white"
              >
                WCAG 2.1 AA
              </Badge>
              <h2 className="mt-4 text-3xl font-bold">
                Accessibility is part of the foundation.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {platformValues.map((value) => {
                const Icon = value.icon;

                return (
                  <article key={value.title} className="rounded-lg bg-white/10 p-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-orange-300" />
                    <h3 className="mt-3 font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {value.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Continue to the login flow
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Passengers, conductors, and administrators will enter the system
              through focused authentication screens.
            </p>
          </div>
          <ButtonLink href="/login" icon={Users}>
            Continue to login
          </ButtonLink>
        </section>
      </main>
    </div>
  );
}
