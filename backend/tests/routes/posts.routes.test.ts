import request from "supertest";
import express from "express";
import postRouter from "../../src/routes/posts";
import * as postsDb from "../../src/db/posts/posts";

const app = express();
app.use(express.json());
app.use("/posts", postRouter);

describe("POST ROUTES", () => {
  describe("GET /posts?userId=", () => {
    it("should return 400 if userId missing", async () => {
      const res = await request(app).get("/posts");
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("userId is required");
    });

    it("should return posts for valid user", async () => {
      jest
        .spyOn(postsDb, "getPosts")
        .mockResolvedValue([
          { id: "1", title: "Hello", body: "World", userId: "3" },
        ]);

      const res = await request(app).get("/posts?userId=3");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  describe("POST /posts", () => {
    it("should validate missing title", async () => {
      const res = await request(app)
        .post("/posts")
        .send({ body: "Hello", userId: 1 });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Title is required/);
    });

    it("should validate missing body", async () => {
      const res = await request(app)
        .post("/posts")
        .send({ title: "Test", userId: 1 });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Body is required/);
    });

    it("should create post successfully", async () => {
      jest.spyOn(postsDb, "createPost").mockResolvedValue({ id: 99 });

      const res = await request(app)
        .post("/posts")
        .send({ title: "T", body: "B", userId: 1 });

      expect(res.status).toBe(201);
      expect(res.body.id).toBe(99);
    });
  });

  describe("DELETE /posts/:id", () => {
    it("should validate id", async () => {
      const res = await request(app).delete("/posts/abc");

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid post id");
    });

    it("should return 404 if post not found", async () => {
      jest.spyOn(postsDb, "deletePost").mockResolvedValue(false);

      const res = await request(app).delete("/posts/22");
      expect(res.status).toBe(404);
    });

    it("should delete successfully", async () => {
      jest.spyOn(postsDb, "deletePost").mockResolvedValue(true);

      const res = await request(app).delete("/posts/22");
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Post deleted");
    });
  });
});
