"use client";

import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to Supabase Auth Dashboard</h1>
      <p className="mt-4">Manage your account securely.</p>
      <div className="mt-6 flex gap-4">
        <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </Link>
        <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
