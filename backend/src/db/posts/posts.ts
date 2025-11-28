import { connection } from "../connection";
import { createPostTemplate } from "./mutation-templates";
import { selectPostsTemplate } from "./query-templates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results as Post[]);
    });
  });

export const createPost = (
  title: string,
  body: string,
  userId: number
): Promise<{ id: number }> =>
  new Promise((resolve, reject) => {
    connection.run(createPostTemplate, [title, body, userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      const lastID = (this as any).lastID;
      resolve({ id: lastID });
    });
  });

export const deletePost = (id: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const SQL = `DELETE FROM posts WHERE id = ?`;
    connection.run(SQL, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      const changes = (this as any).changes ?? 0;
      resolve(changes > 0);
    });
  });
