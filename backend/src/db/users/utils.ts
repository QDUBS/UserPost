import { Address } from "./types";

export const formatAddressRow = (
  row: any
): { address: Address | null; formatted: string | null } => {
  if (!row) return { address: null, formatted: null };

  const street = (row.street ?? row.address_street ?? "").toString().trim();
  const suite = (row.suite ?? row.address_suite ?? "").toString().trim();
  const city = (row.city ?? row.address_city ?? "").toString().trim();
  const zipcode = (row.zipcode ?? row.address_zipcode ?? row.postalCode ?? "")
    .toString()
    .trim();

  const hasPart = !!(street || suite || city || zipcode);
  if (!hasPart) return { address: null, formatted: null };

  const address: Address = {
    id: row.id,
    userId: row.userId ?? row.user_id,
    street: street || null,
    suite: suite || null,
    city: city || null,
    zipcode: zipcode || null,

    // Keep extra fields
    ...Object.keys(row).reduce((acc: any, k) => {
      if (
        ![
          "id",
          "userId",
          "user_id",
          "street",
          "suite",
          "city",
          "zipcode",
          "address_street",
          "address_suite",
          "address_city",
          "address_zipcode",
          "postalCode",
        ].includes(k)
      ) {
        acc[k] = row[k];
      }
      return acc;
    }, {}),
  };

  // Return formatted string
  const parts = [street, suite, city, zipcode].filter((p) => p && p.length > 0);
  const formatted = parts.length > 0 ? parts.join(", ") : null;

  return { address, formatted };
};
