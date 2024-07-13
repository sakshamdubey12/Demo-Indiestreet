"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerDetail from "@/components/user/CustomerDetail";

const CustomerProfile = () => {
  return (
    <>
      <div className="porfile-page px-[5%] py-[3%]">
      <div className="flex justify-center my-5">
        <Avatar className="h-32 w-32">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Tabs
        defaultValue="account-details"
        className="mx-auto shadow-[0_0_40px_rgba(78,27,97,0.15)]"
      >
        <TabsList>
          <TabsTrigger value="account-details">Personal Details</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <div className="content-container md:py-5 py-2 md:px-10 px-3">
          <TabsContent value="account-details">
            <CustomerDetail />
          </TabsContent>
          <TabsContent value="orders">
            Change your password here.
          </TabsContent>
        </div>
      </Tabs>
      </div>
    </>
  );
};

export default CustomerProfile;
