"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile"); // Ganti dengan userId yang sesuai
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        setUserProfile(data);
        toast({
          title: "Profile Loaded",
          description: "User profile has been successfully loaded!",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load user profile.",
          action: (
            <ToastAction altText="Retry" onClick={() => fetchProfile()}>
              Retry
            </ToastAction>
          ),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!userProfile) {
    return <div className="text-center">User profile not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p className="mb-2"><strong>ID:</strong> {userProfile.id}</p>
      <p className="mb-2"><strong>Name:</strong> {userProfile.name}</p>
      <p className="mb-2"><strong>Email:</strong> {userProfile.email}</p>
      <p className="mb-2"><strong>Role:</strong> {userProfile.role}</p>
      <p className="mb-2"><strong>Created At:</strong> {new Date(userProfile.createdAt).toLocaleString()}</p>
      <p className="mb-2"><strong>Updated At:</strong> {new Date(userProfile.updatedAt).toLocaleString()}</p>
      <Button onClick={() => toast({ title: "Profile Action", description: "You clicked the action button!" })}>
        Click Me
      </Button>
      <Toaster />
    </div>
  );
}
