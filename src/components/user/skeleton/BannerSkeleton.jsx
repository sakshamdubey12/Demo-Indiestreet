import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="relative w-full lg:h-[30rem] md:h-[28rem] sm:h-[24rem] h-[18rem]">
      <div className="w-full h-full bg-gray-300 animate-pulse"></div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-12 bg-gray-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-12 bg-gray-400 rounded-full animate-pulse"></div>
    </div>
  );
};

export default BannerSkeleton;
