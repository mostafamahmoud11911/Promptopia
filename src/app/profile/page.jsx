"use client";
import { useEffect, useState } from "react";
import Profile from "../components/Profile/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Myprofile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }

  async function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you wnt to delete this prompt?");
    if (hasConfirmed) {
      await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
      const flitered = posts.filter((p) => p._id != post._id);
      setPosts(flitered);
    }
  }

    return (
      <Profile
        name="My"
        desc="welcome to your personlized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );


}
