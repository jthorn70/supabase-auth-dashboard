"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
        if (!user?.id) {
          console.error("User ID is undefined.");
          return;
        }
      
        console.log("Fetching profile for user ID:", user.id);
      
        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      
        if (error) {
          console.error("Error fetching profile:", error.message);
        } else {
          console.log("Profile data:", data);
          setProfile(data);
        }
      };
      

    fetchProfile();
  }, [user, router]);

  if (!user) return <p>Redirecting...</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-lg font-semibold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="block p-2 hover:bg-gray-700 rounded">Home</a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-700 rounded">Profile</a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-700 rounded">Settings</a>
          </li>
        </ul>
        <Button onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }} className="mt-6 w-full bg-red-500">
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome, {profile?.username || user.email}!</h1>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,245</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>New Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">78</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$12,340</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
