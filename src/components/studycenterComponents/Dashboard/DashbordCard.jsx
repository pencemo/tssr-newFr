import React from "react";

function DashbordCard({ data }) {
  return (
    <div className="w-full h-full">
      {/* Card Section */}
      <div className="mt-10 max-w -[85rem] mx-auto">
        <div className="grid md:grid-cols-4 border border-gray-200 shadow-2xs rounded-xl overflow-hidden">
          {data.map((Item, i) => {
            return (
              <div
                className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 first:before:bg-transparent"
                href="#"
              >
                <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
                  <svg
                    className="shrink-0 size-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>

                  <div className="grow">
                    <p className="text-xs uppercase font-medium text-gray-800">
                      Total users
                    </p>
                    <h3 className="mt-1 text-xl sm:text-3xl font-bold text-primary ">
                      {Item}
                    </h3>
                    <div className="mt-1 flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        from{" "}
                        <span className="font-semibold text-gray-800">
                          70,104
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashbordCard;
