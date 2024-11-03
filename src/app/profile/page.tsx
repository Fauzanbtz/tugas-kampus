'use client'

import { Fragment } from "react"
import { Toaster } from "@/components/ui/toaster"
import { useFetchData } from "@/hooks/useFetchData"
import Navbar from "@/components/common/Navbar"
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm"
import AddressCreateForm from "@/components/address/AddressCreateForm"
import AddressUpdateForm from "@/components/address/AddressUpdateForm"
import Footer from "@/components/common/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, MapPin } from "lucide-react"

export default function Profile() {
  const { data: profileData } = useFetchData({
    queryKey: ["profileData"],
    dataProtected: `/api/profile`,
  })

  const { data: userAddress } = useFetchData({
    queryKey: ["userAddress"],
    dataProtected: `/api/address`,
  })

  const profile = profileData?.data
  const address = userAddress?.data

  return (
    <Fragment>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="text-center">
              {/* <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-4xl">
                    {profile?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div> */}
              <CardTitle className="text-3xl font-bold">{profile?.name}</CardTitle>
              <CardDescription className="text-lg">{profile?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile" className="text-primary">
                    <User className="mr-2 h-4 w-4 " />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="address" className="text-primary">
                    <MapPin className="mr-2 h-4 w-4" />
                    Address
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ProfileUpdateForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="address">
                  <Card>
                    <CardHeader>
                      <CardTitle>Address Information</CardTitle>
                      <CardDescription>Manage your address details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {address?.length < 1 ? (
                        <AddressCreateForm profileId={profile?.id} />
                      ) : (
                        <AddressUpdateForm profileId={profile?.id} />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
      <Toaster />
      <Footer/>
    </Fragment>
  )
}