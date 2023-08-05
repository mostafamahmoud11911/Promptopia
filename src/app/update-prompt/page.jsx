"use client";
import React, { useState, useEffect } from "react";
import Form from "../components/Form/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UpdatePrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  console.log(promptId);
  useEffect(() => {
    async function promptDetails() {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });

    }
    if (promptId) {
      promptDetails();
    }
  }, [promptId]);

  async function updatePrompt(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
if(session?.user){
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmitting={updatePrompt}
    />
  );
}else{
  router.push('/')
}

}
