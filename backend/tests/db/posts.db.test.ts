jest.mock("../../src/db/connection", () => ({
  connection: require("../mocks/connection.mock").mockConnection,
}));

import { getPosts, createPost, deletePost } from "../../src/db/posts/posts";
import { mockConnection } from "../mocks/connection.mock";

jest.mock("../../src/db/connection", () => ({
  connection: mockConnection,
}));

describe("POSTS DB", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getPosts should resolve results", async () => {
    const rows = [{ id: 1 }];
    mockConnection.all.mockImplementation((_sql, _params, cb) =>
      cb(null, rows)
    );

    const result = await getPosts("1");
    expect(result).toEqual(rows);
  });

  it("createPost should return inserted id", async () => {
    mockConnection.run.mockImplementation((_sql, _params, cb) => {
      (mockConnection.run as any).lastID = 10;
      cb.call({ lastID: 10 }, null);
    });

    const result = await createPost("A", "B", 1);
    expect(result.id).toBe(10);
  });

  it("deletePost should return true when changes > 0", async () => {
    mockConnection.run.mockImplementation((_sql, _params, cb) => {
      cb.call({ changes: 1 }, null);
    });

    const result = await deletePost("5");
    expect(result).toBe(true);
  });
});
