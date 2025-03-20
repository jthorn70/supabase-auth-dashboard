"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthForm({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === "login") {
        // Email/Password Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        router.push("/dashboard");
      } else {
        // Email/Password Sign-Up with Redirect
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: "https://your-vercel-deployment.vercel.app/dashboard", // Ensure correct redirect
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
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">{type === "login" ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : type === "login" ? "Login" : "Sign Up"}
            </Button>

            {type === "login" && (
                <div className="text-center text-sm mt-2">
                    <a href="/forgot-password" className="text-blue-500 underline block">
                    Forgot your password?
                    </a>
                    <a href="/signup" className="text-blue-500 underline mt-2 inline-block">
                    Need an account?
                    </a>
                </div>
            )}

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
