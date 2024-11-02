"use client";

import Navbar from "@/components/common/Navbar";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserAddress {
  id: number;
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
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
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const data = await axios.get("/api/address");
      setUserAddress(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedProfile = {
      id: userProfile?.id,
      name: (e.target as any).name.value,
      email: (e.target as any).email.value,
      password: (e.target as any).password.value || "",
    };

    const updatedAddress = {
      id: userAddress?.id,
      userId: userProfile?.id,
      street: (e.target as any).street.value,
      city: (e.target as any).city.value,
      state: (e.target as any).state.value,
      postalCode: (e.target as any).postalCode.value,
      country: (e.target as any).country.value,
    };

    try {
      // Update profile data
      const profileResponse = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedProfile, updatedAddress }),
      });

      if (!profileResponse.ok) throw new Error("Failed to update profile");

      await fetchProfile();
      await fetchUserAddress();

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserAddress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <div className="py-4 px-10 bg-gray-100 min-h-screen text-center">
          <h1 className="text-2xl font-bold mb-2">Loading...</h1>
        </div>
      </Fragment>
    );
  }

  if (!userProfile) {
    return (
      <Fragment>
        <Navbar />
        <div className="py-4 px-10 bg-gray-100 min-h-screen text-center">
          <h1 className="text-2xl font-bold mb-2">USER NOT FOUND</h1>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      <div className="flex flex-col min-h-screen border-4 border-gray-400 p-4">
        <div className="flex flex-col md:flex-row flex-grow bg-gray-100">
          {/* Sidebar Profile */}
          <div className="w-full md:w-1/4 bg-white p-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">User Profile</h2>
              <Image
                src="https://placehold.co/100x100"
                alt="User profile picture"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{userProfile.name}</h3>
              <p className="text-gray-600">{userProfile.email}</p>
              <div className="mt-6">
                <Button
                  onClick={() => setActiveTab("editProfile")}
                  className="w-full py-2 px-4 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Edit Profile
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full py-2 px-4 text-left rounded ${
                    activeTab === "orders"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-white text-gray-700 hover:bg-yellow-100 hover:text-yellow-700"
                  }`}
                >
                  My Orders
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 p-8">
            <h1 className="text-2xl font-bold mb-4">
              Welcome, {userProfile.name}
            </h1>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              quos officia exercitationem, dolor eveniet soluta! Dolore, rem!
              Laborum quam architecto, quos rerum ipsa sunt porro voluptatum hic
              odit dolorum modi.
            </p>

            {/* Content Based on Active Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold mb-4">My Orders</h2>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Purchased &quot;Product A&quot; on 01/01/2024</li>
                  <li>Purchased &quot;Product B&quot; on 01/02/2024</li>
                  <li>Purchased &quot;Product C&quot; on 01/03/2024</li>
                </ul>
              </div>
            )}

            {activeTab === "editProfile" && (
              <>
                <div>
                  <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                  <form className="space-y-4" onSubmit={handleProfileUpdate}>
                    <input
                      type="text"
                      name="name"
                      defaultValue={userProfile.name}
                      placeholder="Name"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      defaultValue={userProfile.email}
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password (leave blank to keep unchanged)"
                      className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Address Fields */}
                    <input
                      type="text"
                      name="street"
                      placeholder="Street"
                      defaultValue={userAddress?.street}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      defaultValue={userAddress?.city}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      defaultValue={userAddress?.state}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal Code"
                      defaultValue={userAddress?.postalCode}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      defaultValue={userAddress?.country}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />

                    <Button
                      type="submit"
                      className="w-full py-2 px-4 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </Fragment>
  );
}
