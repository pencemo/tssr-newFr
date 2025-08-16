import { CardComp } from "@/components/admincomp/AdminDashbord/DataCard";
import { BookOpen02Icon, Mortarboard02Icon } from "hugeicons-react";
import React from "react";

function DashbordCard({ data }) {
  return (
    <div className="w-full h-full">
      {/* Card Section */}
      <div className="mt-10 max-w -[85rem] mx-auto">
        <div className="grid md:grid-cols-4 border border-gray-200 shadow-2xs rounded-xl overflow-hidden">
          <CardComp
          Icon={Mortarboard02Icon}
          data={
            {
              head: "All Students",
              count: data?.students,
              from: `All students of center`
            }
          }
          
          />
          <CardComp
          Icon={Mortarboard02Icon}
          data={
            {
              head: "This Year",
              count: data?.studentsOfCurrentYear,
              from: `Students of ${new Date().getFullYear()}`
            }
          }
          
          />
          <CardComp
          Icon={BookOpen02Icon}
          data={
            {
              head: "Courses",
              count: data?.courses,
              from: `Available courses`
            }
          }
          
          />
          <CardComp
          Icon={Mortarboard02Icon}
          data={
            {
              head: "This Year",
              count: data?.studentsOfCurrentYear,
              from: `Students of ${new Date().getFullYear()}`
            }
          }
          
          />
          
        </div>
      </div>
    </div>
  );
}

export default DashbordCard;
