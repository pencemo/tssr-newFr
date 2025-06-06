import {
  BookOpen02Icon,
  Mortarboard02Icon,
  UserAdd01Icon,
} from "hugeicons-react";
import React from "react";

function DataCard({ data }) {
  console.log(data);
  return (
    <div className="mt-10">
      <div className="">
        <div className="grid md:grid-cols-4 border border-gray-200 shadow-2xs rounded-xl overflow-hidden">
          <CardComp
            data={{ head: "Students", count: data.totalEnrollments, from: "All student count" }}
            Icon={UserAdd01Icon}
          />
          <CardComp
            data={{
              head: "This Year",
              count: data.totalEnrollmentInThisYear,
              from: `Students of ${new Date().getFullYear()}`,
            }}
            Icon={Mortarboard02Icon}
          />
          <CardComp
            data={{
              head: "Study Centre",
              count: data.totalStudyCenters,
              from: "Registered Study Centers",
            }}
            Icon={BookOpen02Icon}
          />
          <CardComp
            data={{ head: "Coures", count: data.totalCourses, from: "Available Courses" }}
            Icon={BookOpen02Icon}
          />
        </div>
      </div>
    </div>
  );
}

export default DataCard;

export function CardComp({ data, Icon }) {
  return (
    <div className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 first:before:bg-transparent">
      <div className="flex  flex-row-reverse gap-y-3 gap-x-5">
        {<Icon size="20" className="text-muted-foreground" />}
        <div className="grow">
          <p className="text-xs uppercase font-medium text-gray-800">
            {data.head}
          </p>
          <h3 className="mt-1 text-xl sm:text-3xl font-bold text-primary">
            {data.count || 0}
          </h3>
          <div className="mt-1 flex justify-between items-center">
            <p className="text-sm text-gray-500">
            {data.from}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
