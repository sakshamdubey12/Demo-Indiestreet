import React from "react";

const StyleSkeleton = () => {
  const skeletonItems = Array(3).fill(0);

  return (
    <section className="px-[5%] lg:py-16 md:py-14 py-10 bg-[#4E1B61]">
      <div className="grid xl:grid-cols-4 grid-cols-1 mx-auto max-w-[100rem]">
        <div className="header xl:col-span-1 flex justify-center items-center">
          <div className="xl:w-[70%] w-full bg-gray-300 h-8 rounded animate-pulse"></div>
        </div>
        <div className="relative lg:w-full lg:col-span-3 lg:flex flex-wrap lg:flex-nowrap grid grid-cols-3 gap-1">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden text-2xl font-medium text-center relative before:w-full before:h-full before:absolute before:transition-all before:ease-in-out before:duration-150 hover:before:bg-[#0000005d] xl:w-72 lg:w-80 lg:h-96 md:h-80 sm:h-72 h-48 w-full flex-shrink-0 flex justify-center items-center md:mx-2 sm:mx-1 mx-0.5 cursor-pointer group"
              style={{ borderRadius: "10px" }}
            >
              <div className="h-full w-full bg-gray-300 animate-pulse"></div>
              <span className="absolute text-[#fff] lg:text-2xl md:text-xl sm:text-lg text-base group-hover:top-[50%] top-[70%] opacity-0 group-hover:opacity-100 ease-in-out duration-500 transition-all bg-gray-300 h-6 w-24 animate-pulse"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleSkeleton;
