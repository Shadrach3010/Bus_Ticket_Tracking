import { BadgeCheck, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import type { DataTableColumn } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { SearchBar } from "@/components/ui/search-bar";

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
  const tableColumns =
    columns ??
    (Object.keys(rows[0] ?? { id: "" }).map((key) => ({
      key,
      label: key
        .split("-")
        .join(" ")
        .replace(/^\w/, (value) => value.toUpperCase()),
    })) as DataTableColumn<ResourceRow>[]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
        <Button type="button">
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
              {index === 0 ? rows.length : index}
            </p>
          </Card>
        ))}
      </section>

      <div className="grid gap-4">
        <SearchBar placeholder={`Search ${title.toLowerCase()}`} />
        <DataTable
          columns={tableColumns}
          rows={rows}
          getRowKey={(row) => row.id}
        />
        <Pagination />
      </div>
    </div>
  );
}
