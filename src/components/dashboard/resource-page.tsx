"use client";

import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Plus } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Pagination } from "@/components/ui/pagination";
import { SearchBar } from "@/components/ui/search-bar";
import { DataTable } from "@/components/ui/table";
import type { DataTableColumn } from "@/components/ui/table";

type ResourceRow = Record<string, string>;

type ResourcePageProps = {
  actionLabel?: string;
  columns?: DataTableColumn<ResourceRow>[];
  description: string;
  rows: ResourceRow[];
  title: string;
};

export function ResourcePage({
  actionLabel = "Add record",
  columns,
  description,
  rows,
  title,
}: ResourcePageProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [localRows, setLocalRows] = useState(rows);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const rowsPerPage = 5;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalRows(rows);
    setPage(1);
  }, [rows]);

  const tableColumns =
    columns ??
    (Object.keys(localRows[0] ?? { id: "" }).map((key) => ({
      key,
      label: key
        .split("-")
        .join(" ")
        .replace(/^\w/, (value) => value.toUpperCase()),
    })) as DataTableColumn<ResourceRow>[]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return localRows;
    }

    return localRows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [localRows, query]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const pageRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const visiblePage = Math.min(page, totalPages);

  function handleActionClick() {
    const nextRecord = {
      id: `NEW-${Date.now().toString().slice(-6)}`,
      ...(localRows[0] ?? { id: "NEW-0001" }),
      status: "Pending",
    };

    setLocalRows((current) => [nextRecord, ...current]);
    setModalMessage(
      `${actionLabel} was queued successfully in the local mock workflow.`,
    );
    setModalOpen(true);
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
        <Button type="button" onClick={handleActionClick}>
          <Plus aria-hidden="true" className="h-4 w-4" />
          {actionLabel}
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        {["Active", "Pending", "Reviewed"].map((label, index) => (
          <Card key={label}>
            <BadgeCheck aria-hidden="true" className="h-5 w-5 text-green-600" />
            <p className="mt-3 text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {index === 0 ? localRows.length : index}
            </p>
          </Card>
        ))}
      </section>

      <div className="grid gap-4">
        <SearchBar
          value={query}
          onChange={(nextValue) => {
            setQuery(nextValue);
            setPage(1);
          }}
          placeholder={`Search ${title.toLowerCase()}`}
        />
        <DataTable
          columns={tableColumns}
          rows={pageRows}
          getRowKey={(row) => String(row.id ?? Math.random().toString(36).slice(2))}
        />
        <Pagination
          page={visiblePage}
          totalPages={totalPages}
          onPrevious={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
        />
      </div>

      <Modal open={modalOpen} title={title} onClose={() => setModalOpen(false)}>
        <Alert tone="success">{modalMessage}</Alert>
      </Modal>
    </div>
  );
}
