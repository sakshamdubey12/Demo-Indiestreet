import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { selectCartSubtotal } from "@/redux/slices/user/cartSlice";
import { useSelector } from "react-redux";

const CheckoutDetail = () => {
  const { toast } = useToast();
  const router = useRouter();
  const subtotal = useSelector(selectCartSubtotal);

  const handleCheckOut = () => {
    const persistData = localStorage.getItem("persist:userData");
    if (persistData) {
      const parsedData = JSON.parse(persistData);
      const isAuth = JSON.parse(parsedData.isAuth);
      if (isAuth === true) {
        router.push("/checkout/address");
      } else {
        toast({ title: "Login to checkout" });
        router.push("/auth");
      }
    } else {
      toast({ title: "Login to checkout" });
      router.push("/auth");
    }
  };
  return (
    <>
      <div className="checkout-container">
        <div className="mt-4 p-4 border border-gray-200 rounded md:sticky top-32 h-fit">
          <div className="flex justify-between mb-2">
            <p className="font-medium sm:text-base text-sm">Subtotal:</p>
            <p className="text-sm">₹ {subtotal}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-medium sm:text-base text-sm">Discount:</p>
            <p className="text-sm">₹ 0</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-medium sm:text-base text-sm">IGST:</p>
            <p className="text-sm">₹ 0</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-medium sm:text-base text-sm">CGST:</p>
            <p className="text-sm">₹ 0</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-medium sm:text-base text-sm">
              Total Including GST:
            </p>
            <p className="text-sm">₹ {subtotal}</p>
          </div>
          <Button
            className="w-full rounded"
            onClick={() => {
              handleCheckOut();
            }}
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutDetail;
