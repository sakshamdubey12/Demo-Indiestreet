import React from "react";

const TrendingSkeleton = () => {
  const skeletonItems = Array(6).fill(0); // Adjust the number of skeleton items as needed

  return (
    <section className="px-[5%] lg:py-16 md:py-12 sm:py-10 py-4 bg-[#4E1B61]">
      <div className="grid lg:grid-cols-6 grid-cols-1 mx-auto max-w-[100rem]">
        <div className="header md:col-span-1 flex justify-center items-center">
          <div className="lg:mb-8 sm:mb-5 mb-2 bg-gray-300 w-full h-8 rounded animate-pulse"></div>
        </div>
        <div className="relative w-full overflow-hidden md:col-span-5">
          <div className="lg:w-[90%] sm:w-[85%] w-full mx-auto">
            <div className="p-3 flex">
              {skeletonItems.map((_, index) => (
                <div
                  key={index}
                  className="pl-1 mr-2 lg:max-w-64 md:max-w-52 sm:max-w-44 max-w-32"
                >
                  <div className="lg:w-64 lg:h-72 md:w-52 md:h-64 sm:w-44 sm:h-52 w-32 h-40 bg-gray-300 rounded-xl animate-pulse"></div>
                  <p className="text-[#CDF520] text-center mt-2 md:text-base sm:text-sm text-xs bg-gray-300 h-4 rounded animate-pulse"></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSkeleton;
