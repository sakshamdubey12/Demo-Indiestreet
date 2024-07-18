"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
const BannerCarousel = lazy(() => import("@/components/user/BannerCarousel"));
import { CarouselSize } from "@/components/user/Categories";
const ProductDisplay = lazy(() => import("@/components/user/ProductDisplay"));
const Style = lazy(() => import("@/components/user/Style"));
const TrendingCollection = lazy(() =>
  import("@/components/user/TrendingCollection")
);
import { useGetProductCategoryQuery } from "@/redux/slices/admin/ProductCategorySlice";
import BannerSkeleton from "@/components/user/skeleton/BannerSkeleton";
import TrendingSkeleton from "@/components/user/skeleton/TrendingSkeleton";
import StyleSkeleton from "@/components/user/skeleton/StyleSkeleton";
import ProductDisplaySkeleton from "@/components/user/skeleton/ProductDisplaySkeleton";
import { useSelector } from "react-redux";

const Home = () => {
  const { data } = useGetProductCategoryQuery();
  const isAuth = useSelector((state) => state.authData.isAuth);

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (isAuth) {
      getLocation();
    }
  }, [isAuth]);
  console.log(location);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  return (
    <>
      <Suspense fallback={<BannerSkeleton />}>
        <BannerCarousel />
      </Suspense>
      <CarouselSize title="Shop by Categories" />
      <Suspense fallback={<TrendingSkeleton />}>
        <TrendingCollection />
      </Suspense>
      <Suspense fallback={<ProductDisplaySkeleton />}>
        <ProductDisplay
          title={data?.data[0]?.categoryName}
          url={`/category/${data?.data[0]?.categoryName
            .toLowerCase()
            .replace(" ", "-")}/${data?.data[0]?._id}`}
        />
      </Suspense>
      <Suspense fallback={<StyleSkeleton />}>
        <Style />
      </Suspense>
      <Suspense fallback={<ProductDisplaySkeleton />}>
        <ProductDisplay
          title={data?.data[1]?.categoryName}
          url={`/category/${data?.data[1]?.categoryName
            .toLowerCase()
            .replace(" ", "-")}/${data?.data[1]?._id}`}
        />
      </Suspense>
    </>
  );
};

export default Home;
