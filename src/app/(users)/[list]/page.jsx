"use client";
import Header from "@/components/user/Header";
import {
  FilterIcon,
  HeartIcon,
  ShoppingBagIcon,
  SortDescIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { useGetProductsByCategoryQuery } from "@/redux/slices/GetAllProduct";
import { setSortBy } from "@/redux/slices/productFilterSortSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";

const Products = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [wishlistIDs, setWishlistIDs] = useState([]);
  const category = useParams();
  const [productName, setProductName] = useState(() => {
    const string = category.list
      .substring(0, category.list.lastIndexOf("-"))
      .replace("-", " ");
    const capitalizedFirstPart = string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return capitalizedFirstPart;
  });
  const [productCategoryId, setProductCategoryId] = useState(
    category.list.substring(category.list.lastIndexOf("-") + 1)
  );
  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useGetProductsByCategoryQuery();
  const sortBy = useSelector((state) => state.sort.sortBy);

  useEffect(() => {
    setProductName(() => {
      const string = category.list
        .substring(0, category.list.lastIndexOf("-"))
        .replace("-", " ");
      const capitalizedFirstPart = string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return capitalizedFirstPart;
    });
    setProductCategoryId(
      category.list.substring(category.list.lastIndexOf("-") + 1)
    );
  }, [category]);

  const sortProducts = (products) => {
    switch (sortBy) {
      case "title-asc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "title-desc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };
  const handleSortChange = (value) => {
    if (
      value === "title-asc" ||
      value === "title-desc" ||
      value === "price-asc" ||
      value === "price-desc"
    ) {
      dispatch(setSortBy(value));
    }
  };

  const filterByCategory = (productList) => {
    const list = productList.filter((product) => {
      return product.categoryName.toUpperCase() === productName.toUpperCase();
    });
    return sortProducts(list);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleAddToWishlist = (item) => {
    dispatch(addToWishlist(item));
  };

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };

  const handleWishlist = (ProductId) => {
    if (wishlistIDs.includes(ProductId)) {
      handleRemoveFromWishlist(ProductId);
    } else {
      handleAddToWishlist(ProductId);
    }
  };

  useEffect(() => {
    const ids = wishlistItems.map((item) => item.id);
    setWishlistIDs(ids);
  }, [wishlistItems]);

  return (
    <section className="px-[5%] py-16">
      <div className="filter flex items-center justify-between mb-4 border-b-2">
        <Header title={productName} />
        <div className="selected"></div>
        <div className="innerfilters pb-2 flex items-center">
          <Sheet>
            <SheetTrigger className="flex items-center text-[#4E1B61] border px-4 py-2 rounded border-[#4E1B61]">
              <FilterIcon />
              <span className=" ml-2">Filter</span>
            </SheetTrigger>
            <SheetContent className=" bg-white">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[200px] ml-2 rounded text-[#4E1B61] border border-[#4E1B61]">
              <SortDescIcon /> <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="title-asc">Title: A to Z</SelectItem>
              <SelectItem value="title-desc">Title: Z to A</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="relevant">Relevant</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="products-listing grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="hover:shadow-[0_0_10px_rgba(78,27,97,0.20)] transition-shadow duration-1000 p-0 rounded overflow-hidden cursor-pointer border m-0 animate-pulse"
              >
                <CardHeader className="p-0 relative top-0 space-y-0">
                  <div className="icons absolute top-3 right-3 flex flex-col justify-center items-center">
                    <div className="py-2.5 px-2.5 rounded-full text-sm bg-gray-300 mb-2"></div>
                  </div>
                  <div className="w-full h-56 bg-gray-300 rounded-lg"></div>
                  <div className="absolute bottom-0 py-2 text-sm bg-gray-300 w-full"></div>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-sm mb-2 line-clamp-2 font-normal bg-gray-300 h-6 w-3/4"></div>
                  <CardDescription className="flex flex-col items-baseline">
                    <span className="mb-1 flex items-center">
                      <span className="text-base font-medium text-red-600 mr-1.5 bg-gray-300 h-5 w-10"></span>
                      <span className="line-through text-sm mr-3 bg-gray-300 h-5 w-10"></span>
                      <span className="bg-gray-300 h-5 w-10"></span>
                    </span>
                    <span className="flex items-center w-full text-sm mb-2">
                      <span className="flex mr-1.5">
                        <FaStar className="mr-1 mt-0.5 text-gray-300" />
                        <span className="font-semibold bg-gray-300 h-6 w-8"></span>
                      </span>
                      <span className="block w-1.5 h-1.5 bg-gray-600 rounded-full mr-1.5"></span>
                      <span className="font-medium underline bg-gray-300 h-6 w-16"></span>
                    </span>
                  </CardDescription>
                  <CardFooter className="flex">
                    <div className="w-1/2 !text-sm bg-gray-300 h-10 mr-2 py-2.5"></div>
                    <div className="w-1/2 !text-sm bg-gray-300 h-10 py-2.5"></div>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            {filterByCategory(products).map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-[0_0_10px_rgba(78,27,97,0.20)] transition-shadow duration-200 p-0 rounded overflow-hidden cursor-pointer border m-0 h-[23rem]"
              >
                <CardHeader className="p-0 relative top-0 space-y-0">
                  <div
                    onClick={() => handleWishlist(product.id)}
                    className="icons absolute top-3 right-3 flex flex-col justify-center items-center"
                  >
                    <button
                      className={
                        (wishlistIDs.includes(product.id)
                          ? "bg-[#4E1B61] text-white "
                          : "bg-white/90 text-[#4E1B61] ") +
                        `py-2.5 px-2.5 rounded-full text-sm font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all mb-2`
                      }
                    >
                      <HeartIcon className=" w-5 h-5" />
                    </button>
                  </div>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <button className=" absolute bottom-0 py-2 text-sm bg-white/90 font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all w-full">
                    View Product
                  </button>
                </CardHeader>
                <CardContent className=" p-2">
                  <CardTitle className=" text-sm mb-0.5 line-clamp-2 font-normal">
                    <span className="block uppercase font-semibold text-xs mb-1 text-gray-500">
                      {product.businessName}
                    </span>
                    <Link
                      className="card-cont block"
                      href={`${category.list}/${product.name
                        .toLowerCase()
                        .replace(" ", "-")}-${product.id}`}
                    >
                      <span className="block">{product.name}</span>
                    </Link>
                  </CardTitle>
                  <CardDescription className=" flex flex-col items-baseline">
                    <span className=" mb-1">
                      <span className="text-base font-medium text-red-600 mr-1.5">
                        &#x20b9;{" "}
                        {product.price - (product.offer / 100) * product.price}
                      </span>
                      <span className=" line-through text-sm mr-3">
                        {product.price}
                      </span>
                      <span className="">-{product.offer}%</span>{" "}
                    </span>

                    <span className="flex items-center w-full text-sm mb-2">
                      <span className="flex mr-1.5">
                        <FaStar className=" mr-1 mt-0.5 text-yellow-500" />
                        <span className=" font-semibold">{product.rating}</span>
                      </span>
                      <span className=" block w-1.5 h-1.5 bg-gray-600 rounded-full mr-1.5"></span>
                      <span className=" font-medium underline">
                        {product.rating} Reviews
                      </span>
                    </span>
                  </CardDescription>
                  <CardFooter className=" flex">
                    <Button
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                      variant="ghost"
                      className="w-1/2 !text-sm bg-gray-200/60 hover:bg-gray-200/60 hover:border-0 border-0 hover:text-gray-800 text-gray-800 mr-2 py-2.5 rounded"
                    >
                      Add to Cart
                    </Button>
                    <Button className="w-1/2 !text-sm py-2.5 rounded">
                      Buy Now
                    </Button>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
