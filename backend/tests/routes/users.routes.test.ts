import request from "supertest";
import express from "express";
import userRouter from "../../src/routes/users";
import * as usersDb from "../../src/db/users/users";

const app = express();
app.use("/users", userRouter);

describe("USER ROUTES", () => {
  describe("GET /users", () => {
    it("should validate incorrect page params", async () => {
      const res = await request(app).get("/users?pageNumber=-1");
      expect(res.status).toBe(400);
    });

    it("should return paginated users", async () => {
      jest
        .spyOn(usersDb, "getUsers")
        .mockResolvedValue([
          { id: 1, name: "John", username: "john", email: "a", phone: "1" },
        ]);

      const res = await request(app).get("/users?pageNumber=0&pageSize=1");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  describe("GET /users/count", () => {
    it("should return user count", async () => {
      jest.spyOn(usersDb, "getUsersCount").mockResolvedValue(50);

      const res = await request(app).get("/users/count");
      expect(res.body.count).toBe(50);
    });
  });
});
