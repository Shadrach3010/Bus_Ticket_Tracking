import { UserRound } from "lucide-react";

export function Avatar({ name }: { name?: string }) {
  const initials = name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
      {initials || <UserRound aria-hidden="true" className="h-5 w-5" />}
    </span>
  );
}
