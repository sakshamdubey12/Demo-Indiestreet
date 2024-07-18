"use client";
import AddressBook from "@/components/user/AddressBook";
import CheckoutDetail from "@/components/user/CheckoutDetail";
import React from "react";

const page = () => {
  return (
    <div className=" max-w-[100rem] mx-auto md:py-10 md:px-[5%] py-5 sm:px-5 px-3 grid lg:grid-cols-3 grid-cols-1 md:gap-10 relative">
      <div className="address-container col-span-2">
        <AddressBook header="Delivery Address" />
      </div>
      <div className="col-span-1">
        <CheckoutDetail />
      </div>
    </div>
  );
};

export default page;
