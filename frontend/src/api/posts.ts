import { APIRoutes } from "../constants/apiRoutes";
import { server } from "../lib/server";
import { Post } from "../types/types";

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const api = await server();
    const res = await api.get(`${APIRoutes.POSTS}/user/${userId}`);
    return res.data;
  } catch (err: any) {
    console.error("Failed to fetch user's posts:", err.message);
    return [];
  }
};

export const createPost = async (payload: { 
  userId: string;
  title: string;
  body: string;
}): Promise<Post> => {
  try {
    const api = await server();
    const res = await api.post(`${APIRoutes.POSTS}`, payload);
    return res.data;
  } catch (err: any) {
    console.error("Failed to create post:", err.message);
    throw err;
  }
};

export const deletePost = async (id: string): Promise<string> => {
  try {
    const api = await server();
    await api.delete(`${APIRoutes.POSTS}/${id}`);
    return id;
  } catch (err: any) {
    console.error(`Failed to delete post with ID ${id}:`, err.message);
    throw err;
  }
};
