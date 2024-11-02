"use client";

import Navbar from "@/components/common/Navbar";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useFetchData } from "@/hooks/useFetchData";
import AddressCreateForm from "@/components/address/AddressCreateForm";
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";
import AddressUpdateForm from "@/components/address/AddressUpdateForm";
import Image from "next/image";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");

  const { data: profileData } = useFetchData({
    queryKey: ["profileData"],
    dataProtected: `/api/profile`,
  });

  const { data: userAddress } = useFetchData({
    queryKey: ["userAddress"],
    dataProtected: `/api/address`,
  });

  const profile = profileData?.data;
  const address = userAddress?.data;

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
                src=""
                alt="User profile picture"
                className="rounded-full mx-auto mb-4"
                width={100}
                height={100}
              />
              <h3 className="text-xl font-semibold">{profile?.name}</h3>
              <p className="text-gray-600">{profile?.email}</p>
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
              Welcome, {profile?.name}
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
              <div className="grid grid-cols-1 gap-5 md:gap-10">
                <ProfileUpdateForm />
                {address?.length < 1 ? (
                  <AddressCreateForm profileId={profile?.id} />
                ) : (
                  <AddressUpdateForm profileId={profile?.id} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </Fragment>
  );
}
