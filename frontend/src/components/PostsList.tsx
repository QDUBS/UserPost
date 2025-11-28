import { Post as PostType } from "../types/types";
import Post from "./Post";

interface Props {
  posts: PostType[];
  onDelete: (id: string) => void;
}

export default function PostsList({ posts, onDelete }: Props) {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={onDelete} />
      ))}
    </>
  );
}
