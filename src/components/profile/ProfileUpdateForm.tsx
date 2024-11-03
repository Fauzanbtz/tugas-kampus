"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateData } from "@/hooks/useUpdateData";
import { useForm } from "react-hook-form";
import { useFetchData } from "@/hooks/useFetchData";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.any().optional(),
});

const ProfileUpdateForm = () => {
  const {
    data: profileData
  } = useFetchData({
    queryKey: ["profileData"],
    dataProtected: `/api/profile`,
  });

  const profile = profileData?.data;

  const preLoadValues = {
    name: profile?.name || null,
    email: profile?.email,
    password: profile?.password,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: preLoadValues || [],
  });

  const mutationUpdateProfile = useUpdateData({
    queryKey: "profileData",
    dataProtected: `/api/profile`,
    backUrl: `/profile`,
    multipart: false,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutationUpdateProfile.mutate(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-fit py-2 px-4 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Update Profile
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProfileUpdateForm;
