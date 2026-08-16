"use client";

import React, { useState } from "react";
import { Users, Search, CheckCircle2, AlertCircle, Phone, Mail, CreditCard } from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { useToast } from "@/components/ui/toast-provider";

const registeredPassengers = [
  {
    id: "passenger-001",
    name: "Aminata Kamara",
    email: "passenger@example.com",
    phone: "+23276123456",
    nationalId: "SL-PAS-992140",
    totalBookings: 8,
    totalSpent: 280,
    status: "Active",
  },
  {
    id: "passenger-002",
    name: "Ibrahim Sesay",
    email: "ibrahim@example.com",
    phone: "+23276888999",
    nationalId: "SL-PAS-331002",
    totalBookings: 5,
    totalSpent: 175,
    status: "Active",
  },
  {
    id: "passenger-003",
    name: "Fatmata Jalloh",
    email: "fatmata@example.com",
    phone: "+23276555444",
    nationalId: "SL-PAS-772911",
    totalBookings: 3,
    totalSpent: 126,
    status: "Active",
  },
  {
    id: "passenger-004",
    name: "Abu Bakarr Cole",
    email: "abu@example.com",
    phone: "+23276777222",
    nationalId: "SL-PAS-881900",
    totalBookings: 2,
    totalSpent: 70,
    status: "Active",
  },
];

export default function AdminPassengersPage() {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [passengers, setPassengers] = useState(registeredPassengers);

  const filtered = passengers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.nationalId.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string, name: string) => {
    setPassengers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "Active" ? "Suspended" : "Active" } : p
      )
    );
    toast.info("Account Status Changed", `Passenger account for ${name} toggled.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Passenger Accounts Registry</h1>
        <p className="mt-1 text-sm text-slate-500">
          View registered rider profiles, national verification IDs, booking history, and account states.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter passengers by name, email, or National ID..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-xs font-medium text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none shadow-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <table className="w-full min-w-[650px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase font-semibold">

            <tr>
              <th className="px-6 py-4">Passenger Name</th>
              <th className="px-6 py-4">National ID</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Total Trips</th>
              <th className="px-6 py-4">Total Spent</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition">
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900">{p.name}</span>
                  <p className="text-[11px] font-mono text-slate-400">{p.id}</p>
                </td>
                <td className="px-6 py-4 font-mono text-purple-700 font-semibold">{p.nationalId}</td>
                <td className="px-6 py-4 text-slate-600">
                  <p>{p.phone}</p>
                  <p className="text-[11px] text-slate-400">{p.email}</p>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">{p.totalBookings} trips</td>
                <td className="px-6 py-4 font-extrabold text-emerald-600">NLe {p.totalSpent}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      p.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => toggleStatus(p.id, p.name)}
                    className="rounded-xl border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    {p.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
