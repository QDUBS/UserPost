import { Post as SinglePost } from "../types/types";

interface Props {
  post: SinglePost;
  onDelete: (id: string) => void;
}

export default function Post({ post, onDelete }: Props) {
  return (
    <section
      key={post.id}
      className="relative w-[16rem] h-[18.35rem] mb-4 border border-dotted border-[#E2E8F0] rounded-lg p-4 bg-white hover:bg-gray-50 transition cursor-pointer shadow-lg shadow-gray-200 flex flex-col"
    >
      <button
        onClick={() => onDelete(post.id)}
        className="absolute top-2 right-2"
      >
        <img
          src="/images/delete.svg"
          alt="delete-icon"
          className="w-7 h-7 cursor-pointer"
        />
      </button>

      <h3 className="font-semibold text-gray-800 mt-2">{post.title}</h3>

      <div className="mt-2 h-28 overflow-hidden">
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
          {post.body}
        </p>
      </div>
    </section>
  );
}
