import Header from "./Header";
import { FilterIcon, SortDescIcon } from "lucide-react";
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

import { useRouter } from "next/navigation";

const Products = () => {


  return (
    <section className="px-[5%] py-16">
      <div className="filter flex items-center justify-between mb-4 border-b-2">
        <Header />
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
          <Select >
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

    </section>
  );
};

export default Products;
