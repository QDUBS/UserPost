import { connection } from "../connection";
import {
  selectAddressTemplate,
  selectCountOfUsersTemplate,
  selectSingleUserTemplate,
  selectUsersTemplate,
} from "./query-templates";
import { User } from "./types";
import { formatAddressRow } from "./utils";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<User>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      async (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          // For each user, query address row and attach the formatted address
          const usersWithAddresses = await Promise.all(
            results.map(async (user) => {
              return new Promise<User>((res, rej) => {
                connection.get(
                  selectAddressTemplate,
                  [user.id, user.id],
                  (addrErr, addrRow) => {
                    if (addrErr) {
                      // If address lookup fails for a user set to null
                      user.address = null;
                      user.formattedAddress = null;
                      return res(user);
                    }
                    const { address, formatted } = formatAddressRow(addrRow);
                    user.address = address;
                    user.formattedAddress = formatted;
                    res(user);
                  }
                );
              });
            })
          );

          resolve(usersWithAddresses);
        } catch (e) {
          reject(e);
        }
      }
    );
  });

export const getSingleUser = (userId: string): Promise<User | null> =>
  new Promise((resolve, reject) => {
    connection.get(selectSingleUserTemplate, [userId], (error, row) => {
      if (error) return reject(error);
      if (!row) return resolve(null);
      resolve(row as User);
    });
  });

export const createUserWithAddress = (
  user: { name: string; username: string; email: string; phone?: string },
  address?: { street?: string; suite?: string; city?: string; zipcode?: string }
): Promise<{ userId: number; addressId?: number }> =>
  new Promise((resolve, reject) => {
    connection.run("BEGIN TRANSACTION", (beginErr) => {
      if (beginErr) return reject(beginErr);

      const insertUserSql = `
        INSERT INTO users (name, username, email, phone)
        VALUES (?, ?, ?, ?)
      `;

      connection.run(
        insertUserSql,
        [user.name, user.username, user.email, user.phone ?? null],
        function (userErr) {
          if (userErr) {
            connection.run("ROLLBACK", () => reject(userErr));
            return;
          }
          const newUserId = (this as any).lastID;

          if (!address) {
            return connection.run("COMMIT", (cErr) => {
              if (cErr) {
                connection.run("ROLLBACK", () => reject(cErr));
                return;
              }
              resolve({ userId: newUserId });
            });
          }

          const insertAddressSql = `
            INSERT INTO addresses (userId, street, suite, city, zipcode)
            VALUES (?, ?, ?, ?, ?)
          `;

          connection.run(
            insertAddressSql,
            [
              newUserId,
              address.street ?? null,
              address.suite ?? null,
              address.city ?? null,
              address.zipcode ?? null,
            ],
            function (addrErr) {
              if (addrErr) {
                connection.run("ROLLBACK", () => reject(addrErr));
                return;
              }
              const newAddressId = (this as any).lastID;
              connection.run("COMMIT", (cErr2) => {
                if (cErr2) {
                  connection.run("ROLLBACK", () => reject(cErr2));
                  return;
                }
                resolve({ userId: newUserId, addressId: newAddressId });
              });
            }
          );
        }
      );
    });
  });
