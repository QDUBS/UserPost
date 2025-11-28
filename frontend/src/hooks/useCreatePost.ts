import { Post } from "../types/types";
import { createPost } from "../api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = (userId: string) => {
  const qc = useQueryClient();

  return useMutation<Post, unknown, { userId: string; title: string; body: string }>({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      qc.setQueryData<Post[]>(["posts", userId], (old = []) => [...old, newPost]);
    },
  });
};
