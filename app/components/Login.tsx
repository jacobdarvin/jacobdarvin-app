"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Authentication failed");
        throw new Error(error);
      }

      router.push("/post");
    } catch {
      setError("An error occurred. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-neutral-50 rounded-lg shadow-md">
        {error && (
          <div className="p-3 text-xs text-red-500 bg-red-50 rounded">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Hey me!</h1>
          <p className="text-xs text-gray-500">
            If you&apos;re not me, congratulations on finding the secret login
            page!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="my@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="my-password"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {!isLoading ? `Sign in` : `Signing in...`}
          </Button>
        </form>
      </div>
    </div>
  );
}
