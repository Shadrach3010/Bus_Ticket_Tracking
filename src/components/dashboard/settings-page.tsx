"use client";

import { useState } from "react";
import { Bell, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const defaultSettings = [
  {
    title: "Security",
    description: "Password, session, and account protection preferences.",
    icon: ShieldCheck,
    enabled: true,
  },
  {
    title: "Notifications",
    description: "Booking, validation, payment, and report alerts.",
    icon: Bell,
    enabled: true,
  },
  {
    title: "Preferences",
    description: "Display, accessibility, and dashboard defaults.",
    icon: SlidersHorizontal,
    enabled: false,
  },
];

export function SettingsPage({ title }: { title: string }) {
  const [settings, setSettings] = useState(defaultSettings);

  function toggleSetting(index: number) {
    setSettings((current) =>
      current.map((setting, itemIndex) =>
        itemIndex === index ? { ...setting, enabled: !setting.enabled } : setting,
      ),
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Manage account and workspace preferences.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {settings.map((setting, index) => {
          const Icon = setting.icon;

          return (
            <Card key={setting.title}>
              <div className="flex items-start justify-between gap-3">
                <Icon aria-hidden="true" className="h-6 w-6 text-blue-600" />
                <Button
                  type="button"
                  variant={setting.enabled ? "primary" : "secondary"}
                  className="min-h-9 px-3 py-2 text-xs"
                  onClick={() => toggleSetting(index)}
                >
                  {setting.enabled ? "Enabled" : "Disabled"}
                </Button>
              </div>
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
