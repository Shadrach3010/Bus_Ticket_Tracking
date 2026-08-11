"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const validReferences = [
  "BT-2026-0148",
  "BT-2026-0150",
  "BT-2026-0165",
  "BT-2026-0172",
];

export default function ConductorScanPage() {
  const [reference, setReference] = useState("BT-2026-0148");
  const [result, setResult] = useState("Ticket is valid and ready for boarding.");
  const [tone, setTone] = useState<"success" | "error">("success");
  const [error, setError] = useState("");

  function handleValidate() {
    const normalized = reference.trim().toUpperCase();

    if (!normalized) {
      setError("Enter a ticket reference to validate.");
      setTone("error");
      setResult("Validation could not proceed.");
      return;
    }

    const isValid = validReferences.includes(normalized);
    setError("");

    if (isValid) {
      setTone("success");
      setResult(`${normalized} is valid and ready for boarding.`);
      return;
    }

    setTone("error");
    setResult(`${normalized} could not be verified. Please check the reference or ask the passenger to rebook.`);
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Scan Ticket</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Verify digital tickets by QR or manual reference number.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket validation</CardTitle>
          <CardDescription>Use QR input or manually enter the ticket reference.</CardDescription>
        </CardHeader>

        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <Input
            label="Ticket reference"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
          />
          <Button type="button" onClick={handleValidate}>
            Validate
          </Button>
        </div>

        {error ? (
          <div className="mt-4">
            <Alert tone="error">{error}</Alert>
          </div>
        ) : null}

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">Validation result</p>
          <div className="mt-2">
            <Alert tone={tone}>{result}</Alert>
          </div>
        </div>
      </Card>
    </div>
  );
}
