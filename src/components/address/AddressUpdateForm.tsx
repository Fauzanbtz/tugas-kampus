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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useUpdateData } from "@/hooks/useUpdateData";
import { useFetchData } from "@/hooks/useFetchData";

const formSchema = z.object({
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  state: z.string(),
  street: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddressUpdateForm = ({ profileId }: { profileId: string }) => {
  const { data: userAddress } = useFetchData({
    queryKey: ["userAddress"],
    dataProtected: `/api/address`,
  });

  const address = userAddress?.data[0];

  const preLoadValues = {
    city: address?.city,
    country: address?.country,
    postalCode: address?.postalCode,
    state: address?.state,
    street: address?.street,
  };
  console.log(address)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: preLoadValues || [],
  });

  const mutatioonUpdateUserAddress = useUpdateData({
    queryKey: "profileData",
    dataProtected: address ? `/api/address/${address.id}` : "",
    backUrl: `/profile`,
    multipart: false,
  });
  

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutatioonUpdateUserAddress.mutate(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Address</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-fit py-2 px-4 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Update Address
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
    
  );
  
};

export default AddressUpdateForm;
