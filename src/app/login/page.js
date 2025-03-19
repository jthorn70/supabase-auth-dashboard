"use client";

import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect if logged in
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthForm type="login" />
    </div>
  );
}
