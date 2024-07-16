import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse border rounded-lg shadow-lg p-4">
      <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

const ProductDisplaySkeleton = () => {
  return (
    <section className="px-[5%] lg:py-16 md:py-12 sm:py-10 py-6 mx-auto max-w-[100rem]">
      <div className="header flex items-center justify-between md:mb-8 sm:mb-4 mb-0">
        <div className="bg-gray-300 h-6 w-1/3 rounded animate-pulse"></div>
        <div className="bg-gray-300 h-8 w-1/4 rounded animate-pulse"></div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductDisplaySkeleton;
