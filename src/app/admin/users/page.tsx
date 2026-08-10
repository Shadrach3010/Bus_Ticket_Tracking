import { ResourcePage } from "@/components/dashboard/resource-page";
import { resourceRows } from "@/lib/dashboard-content";

export default function AdminUsersPage() {
  return (
    <ResourcePage
      title="Users"
      description="Manage users across passenger, conductor, and administrator roles."
      actionLabel="Add user"
      rows={resourceRows.adminUsers}
    />
  );
}
