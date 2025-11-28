import { Request, Response, Router } from "express";
import { createPost, deletePost, getPosts } from "../db/posts/posts";
import { validateCreatePost } from "../validations/posts";

const router = Router();

// Get posts for a specific user
router.get("/user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  if (!userId) {
    res.status(400).send({ error: "User Id is required" });
    return;
  }
  try {
    const posts = await getPosts(userId);
    res.send(posts);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch posts", detail: err });
  }
});

// Create a new post
router.post("/", async (req: Request, res: Response) => {
  try {
    const validation = validateCreatePost(req.body ?? {});
    if (!validation.valid) {
      res.status(400).send({ errors: validation.errors });
      return;
    }

    const { title, body, userId } = validation.data!;
    const newPost = await createPost(title, body, userId);
    res
      .status(201)
      .send({ message: "Post created successfully", id: newPost.id });
  } catch (err) {
    res.status(500).send({ error: "Failed to create post", detail: err });
  }
});

// Delete a post by the id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    // Check if the post exists

    const deleted = await deletePost(id);
    if (!deleted) {
      res.status(404).send({ error: "Post not found" });
      return;
    }
    res.status(200).send({ message: "Post deleted" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete post", detail: err });
  }
});

export default router;
