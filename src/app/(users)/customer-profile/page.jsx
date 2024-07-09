"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/common/authSlice"; 
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <div>customer profile</div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default CustomerProfile;
