import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { getUser } from "../api/users";
import NewPostModal from "../components/NewPostModal";
import PostsList from "../components/PostsList";
import { useUserPosts } from "../hooks/useUserPost";
import { alert } from "../utilities/alert";

export default function UserPostsPage() {
  const { id } = useParams<{ id: string }>();
  const userId = id || "";
  const [modalOpen, setModalOpen] = useState(false);

  const { postsQuery, deleteMutation } = useUserPosts(userId);

  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });

  if (userQuery.isError || postsQuery.isError) {
    alert("Failed to load users.", "error");
    return;
  }

  const user = userQuery.data;
  const posts = postsQuery.data || [];

  return (
    <main className="min-h-screen flex justify-center pt-40 p-6">
      {(userQuery.isLoading || postsQuery.isLoading) && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {!(userQuery.isLoading || postsQuery.isLoading) && (
        <section className="w-full">
          <article className="rounded-lg p-6 bg-white max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-4 mb-6 text-lg"
            >
              <p className="text-[#62748E] text-sm">User</p>
              <FaChevronRight color="#62748E" size={10} />
              <p className="font-normal text-sm">{user?.name}</p>
            </nav>

            {/* Page Header */}
            <header className="flex flex-col gap-3 mb-12">
              <h1 className="text-4xl font-medium">{user?.name}</h1>

              <div className="flex items-center gap-2 text-lg">
                <span className="text-[#62748E] font-normal text-sm">
                  {user?.email}
                </span>
                <span className="text-[0.4rem]">●</span>
                <span className="font-normal text-sm">
                  {posts.length} Posts
                </span>
              </div>
            </header>

            {/* Posts Section */}
            <section
              aria-labelledby="posts-heading"
              className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start"
            >
              {/* New Post button */}
              <article>
                <button
                  onClick={() => setModalOpen(true)}
                  className="
                    w-[16rem] h-[18.35rem] border border-dotted border-[#E2E8F0] 
                    rounded-lg p-10 flex flex-col items-center justify-center 
                    bg-white hover:bg-gray-50 transition cursor-pointer
                  "
                >
                  <IoMdAddCircleOutline color="#000" size={28} />
                  <p className="mt-3 text-black">New Post</p>
                </button>
              </article>

              {/* Posts List */}
              <PostsList posts={posts} onDelete={deleteMutation.mutate} />
            </section>
          </article>

          {/* Modal */}
          <NewPostModal
            open={modalOpen}
            setOpen={setModalOpen}
            userId={userId}
          />
        </section>
      )}
    </main>
  );
}
