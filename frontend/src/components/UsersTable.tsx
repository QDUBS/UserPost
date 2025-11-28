import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { alert } from "../utilities/alert";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  page: number;
  setPage: (page: number) => void;
}

export default function UsersTable({ page, setPage }: Props) {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useUsers(page);

  if (isError) {
    alert("Failed to load users.", "error");
    return;
  }

  const totalPages: number = data?.total ?? 10;

  const getPageItems = (current: number, last: number) => {
    const items: Array<number | "ellipsis"> = [];

    if (last <= 7) {
      for (let i = 1; i <= last; i++) items.push(i);
      return items;
    }

    // Always show first page
    items.push(1);

    const left = Math.max(2, current - 1);
    const right = Math.min(last - 1, current + 1);

    if (left > 2) items.push("ellipsis");

    for (let i = left; i <= right; i++) items.push(i);

    if (right < last - 1) items.push("ellipsis");

    // Always show last page
    items.push(last);

    return items;
  };

  const pageItems = getPageItems(page, totalPages);

  return (
    <main className="w-full max-w-4xl">
      <div
        className={`border-2 border-[#E2E8F0] rounded-lg shadow-xl shadow-gray-300
        ${
          isLoading && "min-w-[850px] min-h-60 flex items-center justify-center"
        }`}
      >
        {isLoading && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {!isLoading && (
          <table className="w-full">
            <thead className="text-[#62748E] text-sm rounded-2xl">
              <tr>
                <th className="min-w-[226px] px-3 py-3 text-left text-sm font-medium">
                  Full name
                </th>
                <th className="min-w-[226px] px-3 py-3 text-left text-sm font-medium">
                  Email address
                </th>
                <th className="min-w-[226px] px-3 py-3 w-[392px] text-left text-sm font-medium">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.users.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="border-t border-[#E2E8F0] hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/users/${user.id}`)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        navigate(`/users/${user.id}`);
                      }
                    }}
                    role="button"
                  >
                    <td className="min-w-[226px] px-3 py-3 text-sm font-normal">
                      {user.name}
                    </td>
                    <td className="min-w-[226px] px-3 py-3 text-sm font-normal">
                      {user.email}
                    </td>
                    <td className="min-w-[226px] truncate overflow-hidden whitespace-nowrap max-w-[392px] px-3 py-3 text-sm font-normal">
                      {user.formattedAddress}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <nav aria-label="Users pagination" className="mt-12">
      <ul className="flex items-center justify-end gap-4 text-sm text-[#08142A]">
          {/* Previous */}
          <li>
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-3 py-2 disabled:opacity-40"
            >
              <FaChevronLeft color="#000" size={12} />
              <p className="text-sm font-medium">Previous</p>
            </button>
          </li>

          {/* Page numbers */}
          {pageItems.map((item, idx) =>
            item === "ellipsis" ? (
              <li key={`e-${idx}`} className="px-2 select-none">
                …
              </li>
            ) : (
              <li key={item}>
                <button
                  onClick={() => setPage(item as number)}
                  aria-current={item === page ? "page" : undefined}
                  className={
                    item === page
                      ? "py-3 px-4 rounded-lg border-2 border-[#E2E8F0] text-sm font-medium cursor-pointer bg-white shadow-sm min-w-11 text-center"
                      : "py-3 px-3 rounded-lg text-center text-sm font-medium cursor-pointer min-w-9"
                  }
                >
                  {item}
                </button>
              </li>
            )
          )}

          {/* Next */}
          <li>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex flex-row items-center gap-2 px-3 py-2 disabled:opacity-40"
            >
              <p className="text-sm font-medium">Next</p>
              <FaChevronRight color="#000" size={12} />
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
