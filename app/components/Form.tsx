"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload } from "lucide-react";

export default function Form() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      } else {
        router.push(`/blog/${data.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="w-full max-w-2xl p-8 space-y-4 bg-neutral-50 rounded-lg shadow-md ">
        <h1 className="text-2xl font-bold tracking-tight">Create a New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Image
            </label>
            <div
              className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <input
                id="image-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview ? (
                <div className="relative w-full aspect-video">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-neutral-950 bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <p className="text-white font-medium">
                      Click to change image
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium">
                    Click to upload an image
                  </p>
                  <p className="text-xs mt-1">
                    PNG, JPG, JPEG or GIF (max. 10MB)
                  </p>
                </div>
              )}
            </div>
          </div>

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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {!isLoading ? "Create Post" : "Submitting..."}
          </Button>
          <Button variant={"outline"} onClick={handleLogout} className="w-full">
            Log Out
          </Button>
        </form>
      </div>
    </div>
  );
}
