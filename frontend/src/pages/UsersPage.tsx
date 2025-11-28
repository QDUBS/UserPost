import { useState } from "react";
import UsersTable from "../components/UsersTable";

export default function UsersPage() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-40 p-6">
      <div>
        <h1 className="text-6xl font-medium mb-6">Users</h1>
        <UsersTable page={page} setPage={setPage} />
      </div>
    </div>
  );
}
