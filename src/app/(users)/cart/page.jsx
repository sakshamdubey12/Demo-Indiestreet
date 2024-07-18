"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/user/Header";
import { ShoppingCartIcon, Trash2Icon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateQuantity,
} from "@/redux/slices/user/cartSlice";
import Link from "next/link";
import Image from "next/image";
import CheckoutDetail from "@/components/user/CheckoutDetail";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleInputChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const removeFromCartFn = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className=" max-w-[100rem] mx-auto md:py-10 md:px-[5%] py-5 sm:px-5 px-3 grid lg:grid-cols-3 grid-cols-1 md:gap-10 relative">
      <div className="cart-items col-span-2">
        {cartItems.length > 0 ? (
          <>
            <div className="cart-header flex justify-between items-center mb-2">
              <Header title="Cart" className="pb-0" />
              <Button
                onClick={handleClear}
                className="md:text-sm md:px-5 px-3 md:py-2.5 py-2"
              >
                Clear Cart
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="text-gray-600 uppercase">
                  <TableHead className="text-left">Product</TableHead>
                  {/* <TableHead className="text-center max-w-36 w-36">
                    Quantity
                  </TableHead> 
                  <TableHead className="text-right">Total Price</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => {
                  return (
                    <TableRow key={item.id} className=" py-1 px-10">
                      <TableCell className="w-96">
                        <div className="flex items-start">
                          <div className="img-qty flex flex-col w-fit mr-3">
                            <Image
                              width={1000}
                              height={1000}
                              src={item.images[0]}
                              alt={item.name}
                              className="md:w-28 w-20 md:h-24 h-20 mx-auto mb-1.5"
                            />
                            <div className="qty flex items-center">
                              <Button
                                className="text-lg border border-[#4E1B61] h-8 w-5 rounded-r-none relative left-0.5"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    handleDecreaseQuantity(item.id);
                                  }
                                }}
                              >
                                {" "}
                                -
                              </Button>
                              <Input
                                value={item.quantity}
                                className="text-center w-10 h-8 rounded-none p-0"
                                onChange={(e) =>
                                  handleInputChange(
                                    item.id,
                                    parseInt(e.target.value)
                                  )
                                }
                              />
                              <Button
                                className="text-lg border border-[#4E1B61] h-8 w-7 rounded-l-none relative right-0.5"
                                onClick={() => {
                                  handleIncreaseQuantity(item.id);
                                }}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="text-base">
                            <Link
                              href={`/product/${item.name
                                .toLowerCase()
                                .replace(" ", "-")}/${item.id}`}
                              className="font-semibold"
                            >
                              {item.name}
                            </Link>
                            <p className=" text-gray-500 font-medium uppercase text-sm mt-2 mb-1">
                              {item.businessName}
                            </p>
                            <p className=" md:text-sm text-xs flex flex-wrap">
                              <span className="text-red-600 mr-2 font-medium">
                                &#x20b9;{" "}
                                {item.price - (item.offer / 100) * item.price}
                              </span>
                              <span className=" line-through">
                                &#x20b9; {item.price}
                              </span>
                            </p>
                            <Button
                              onClick={() => removeFromCartFn(item.id)}
                              variant="ghost"
                              className="hover:bg-transparent hover:border-gray-300 border border-gray-300 hover:text-gray-600 text-gray-600 font-normal h-9 text-sm relative md:top-6 top-3"
                            >
                              <Trash2Icon className=" h-4 w-4 mr-1" />{" "}
                              <span> Remove</span>
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      {/* <TableCell className="flex items-center justify-center">
                        
                      </TableCell> */}
                      {/* <TableCell className="md:w-52 w-40">
                        <p className=" font-medium mb-2 text-right block">
                          ₹ {totalPrice.toFixed(2)}
                        </p>
                        <Button
                          onClick={() => removeFromCartFn(item.id)}
                          variant="ghost"
                          className="hover:bg-transparent hover:border-gray-300 border border-gray-300 hover:text-gray-600 text-gray-600 font-normal h-10 text-sm relative float-right"
                        >
                          <Trash2Icon className=" h-4 w-4" />
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        ) : (
          <>
            <div className="empty-cart py-36 text-center flex items-center justify-center">
              <p className="lg:text-7xl text-5xl font-semibold text-[#4e1b6192] z-10">
                Cart Empty
              </p>
              <ShoppingCartIcon className=" text-[#cef52047] lg:w-32 w-24 lg:h-32 h-24 absolute z-0 mix-blend-saturation" />
            </div>
          </>
        )}
      </div>

      <div className="col-span-1">
        <CheckoutDetail />
      </div>
    </div>
  );
};

export default Cart;
