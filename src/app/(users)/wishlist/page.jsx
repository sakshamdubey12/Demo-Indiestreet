"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/user/Header";
import { useSelector, useDispatch } from "react-redux";
import wishlistSlice, { clearWishlist } from "@/redux/slices/user/wishlistSlice";
import ProductCard from "@/components/user/ProductCard";
import { HeartIcon } from "lucide-react";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist);
  console.log(wishlistItems);

  const clearWishlistItems = () => {
    dispatch(clearWishlist());
  };

  return (
    <div className=" max-w-[100rem] mx-auto px-[5%] lg:py-16 md:py-12 sm:py-10 py-4 relative">
      <div className="wishlist-items">
        {wishlistItems.length > 0 ? (
          <>
            <div className="wishlist-header flex justify-between items-baseline mb-5">
              <Header title="Wishlist" />
              <Button
                onClick={() => {
                  clearWishlistItems();
                }}
              >
                Clear Wishlist
              </Button>
            </div>
            <div className="wishlist-item grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-2">
              {wishlistItems.map((item) => (
                <div className="card-container sm:scale-100 scale-95" key={item.id}>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="wishlist py-36 text-center flex items-center justify-center">
              <p className="lg:text-7xl text-5xl font-semibold text-[#4e1b61b1] z-10">
                Wishlist Empty
              </p>
              <HeartIcon
                fill="#cef52047"
                className=" text-[#cef52047] lg:w-32 w-24 lg:h-32 h-24 absolute z-0 mix-blend-saturation"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
