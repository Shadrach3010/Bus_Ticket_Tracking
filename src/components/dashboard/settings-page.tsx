import { Bell, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const settings = [
  {
    title: "Security",
    description: "Password, session, and account protection preferences.",
    icon: ShieldCheck,
  },
  {
    title: "Notifications",
    description: "Booking, validation, payment, and report alerts.",
    icon: Bell,
  },
  {
    title: "Preferences",
    description: "Display, accessibility, and dashboard defaults.",
    icon: SlidersHorizontal,
  },
];

export function SettingsPage({ title }: { title: string }) {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Manage account and workspace preferences.
        </p>
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        {settings.map((setting) => {
          const Icon = setting.icon;

          return (
            <Card key={setting.title}>
              <Icon aria-hidden="true" className="h-6 w-6 text-blue-600" />
              <CardHeader className="mb-0 mt-4">
                <CardTitle>{setting.title}</CardTitle>
                <CardDescription>{setting.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
