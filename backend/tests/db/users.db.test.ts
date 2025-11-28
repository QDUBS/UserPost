jest.mock("../../src/db/connection", () => ({
  connection: require("../mocks/connection.mock").mockConnection,
}));

import { getUsers, getUsersCount } from "../../src/db/users/users";
import { mockConnection } from "../mocks/connection.mock";
import * as utils from "../../src/db/users/utils";

jest.mock("../../src/db/connection", () => ({
  connection: mockConnection,
}));

describe("USERS DB", () => {
  beforeEach(() => jest.clearAllMocks());

  it("getUsersCount should return count", async () => {
    mockConnection.get.mockImplementation((_sql, cb) =>
      cb(null, { count: 20 })
    );

    const count = await getUsersCount();
    expect(count).toBe(20);
  });

  it("getUsers should return users with attached formatted address", async () => {
    mockConnection.all.mockImplementation((_sql, _params, cb) =>
      cb(null, [{ id: 1, name: "A" }])
    );

    mockConnection.get.mockImplementation((_sql, params, cb) =>
      cb(null, { street: "S", city: "C" })
    );

    jest.spyOn(utils, "formatAddressRow").mockReturnValue({
      address: { street: "S", city: "C" },
      formatted: "S, C",
    });

    const users = await getUsers(0, 10);

    expect(users[0].address!.street).toBe("S");
    expect(users[0].formattedAddress).toBe("S, C");
  });
});
