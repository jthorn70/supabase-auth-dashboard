"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before new attempt

    try {
      if (type === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        console.log("User logged in:", data);

        router.push("/dashboard"); // Redirect on successful login
      } else {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: "https://supabase-auth-dashboard-iota.vercel.app/update-password",
            },
          });

        if (error) throw error;
        alert("Check your email to confirm your account.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="border p-2 rounded"
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="border p-2 rounded"
  />

  <button type="submit" className="bg-blue-500 text-white p-2 rounded">
    {loading ? "Loading..." : type === "login" ? "Login" : "Sign Up"}
  </button>

  {/* Centered Forgot Password Link */}
  {type === "login" && (
    <div className="text-center">
      <a href="/forgot-password" className="text-blue-500 underline">
        Forgot your password?
      </a>
    </div>
  )}
</form>

  );
}
