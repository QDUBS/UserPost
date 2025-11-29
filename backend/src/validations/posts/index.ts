import { CreatePost, ICreatePost } from "./types";

export function validateCreatePost(input: ICreatePost): CreatePost {
  const errors: { title?: string; body?: string; userId?: string } = {};

  // Title
  if (input.title === undefined || input.title === null) {
    errors.title = "Title is required";
  } else if (typeof input.title !== "string") {
    errors.title = "Title must be a string";
  } else if (input.title.trim().length === 0) {
    errors.title = "Title cannot be empty";
  }

  // Body
  if (input.body === undefined || input.body === null) {
    errors.body = "Body is required";
  } else if (typeof input.body !== "string") {
    errors.body = "Body must be a string";
  } else if (input.body.trim().length === 0) {
    errors.body = "Body cannot be empty";
  }

  // UserId
  if (
    input.userId === undefined ||
    input.userId === null ||
    input.userId === ""
  ) {
    errors.userId = "userId is required";
  }

  const hasErrors = Object.keys(errors).length > 0;
  if (hasErrors) {
    return { valid: false, errors };
  }

  const title = (input.title as string).trim();
  const body = (input.body as string).trim();
  const userId = (  input.userId as string).trim();

  return { valid: true, data: { title, body, userId } };
}
