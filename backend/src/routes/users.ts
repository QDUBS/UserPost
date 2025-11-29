import { Request, Response, Router } from "express";

import { getSingleUser, getUsers, getUsersCount } from "../db/users/users";

const router = Router();

// Get all users with pagination
router.get("/", async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;
  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  const users = await getUsers(pageNumber, pageSize);
  res.send(users);
});

// Get single user by ID
router.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  if (!userId) {
    res.status(400).send({ error: "User Id is required" });
    return;
  }
  try {
    const user = await getSingleUser(userId);
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch user", detail: err });
  }
});

// Get total count of users
router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

export default router;
