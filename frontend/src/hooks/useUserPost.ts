import { Post } from "../types/types";
import { getUserPosts, deletePost } from "../api/posts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteContext {
  previousPosts: Post[] | undefined;
}

export const useUserPosts = (userId: string) => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: () => getUserPosts(userId),
  });

  const deleteMutation = useMutation<string, unknown, string, DeleteContext>({
    mutationFn: deletePost,

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["posts", userId] });

      const previousPosts =
        queryClient.getQueryData<Post[]>(["posts", userId]);

      // Optimistically update
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(
          ["posts", userId],
          previousPosts.filter((p) => p.id !== postId)
        );
      }

      return { previousPosts }; // <- typed context
    },

    onError: (_err, _id, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts", userId], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
  });

  return { postsQuery, deleteMutation };
};
