import { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
}

export default function NewPostModal({ open, setOpen, userId }: Props) {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;

    const MAX_HEIGHT = 600;

    el.style.height = "auto";

    const newHeight = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${newHeight}px`;

    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";

    setBody(el.value);
  };

  const createPost = useCreatePost(userId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <form
        className="bg-white rounded-xl p-6 w-full max-w-3xl"
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ userId, title, body });
          setOpen(false);
          setBody('')
          setTitle('')
        }}
      >
        <h2 className="text-4xl mb-4">New post</h2>

        <label htmlFor="post-title" className="block mb-1">
          Post title
        </label>
        <input
          className="border border-[#E2E8F0] w-full p-2 mb-3 rounded"
          placeholder="Give your post a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="post-title" className="block mt-3 mb-1">
          Post content
        </label>
        <textarea
          className="border w-full p-2 mb-3 rounded"
          placeholder="Write something mind-blowing"
          value={body}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="border px-3 py-1 rounded-xl cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button className="bg-[#155DFC] text-white px-4 py-1 rounded-xl cursor-pointer">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
