"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      } else {
        router.push(`/blog/${data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold tracking-tight">Create a New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Create Post
          </Button>
          <Button variant={"outline"} onClick={handleLogout} className="w-full">
            Log Out
          </Button>
        </form>
      </div>
    </div>
  );
}
