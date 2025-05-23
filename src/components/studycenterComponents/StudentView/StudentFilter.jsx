import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currentYear = new Date().getFullYear();
const oldYears = Array.from({ length: 20 }, (_, i) => currentYear - i);

function StudentFilter({ filters, onFilterChange, courses }) {
    console.log(courses);
    const courseId = courses.map((course) => course.courseName);
  return (
    <div className="w-full grid md:grid-cols-4 gap-4 border p-3 md:p-5 rounded-xl">
      <SelctFilter data={courseId} text={"Select Course"} value={filters.course} onChange={(value) => onFilterChange("course", value)} lebal={"Course"} />
      <SelctFilter data={oldYears} text={"Select Batch"}  value={filters.batch} onChange={(value) => onFilterChange("batch", value)} lebal={"Batch"} />
      <SelctFilter data={oldYears} text={"Select Year"}  value={filters.year} onChange={(value) => onFilterChange("year", value)} lebal={"Year"} />
      <SelctFilter data={oldYears} text={"Sort by"}  value={filters.sort} onChange={(value) => onFilterChange("sort", value)} lebal={"Sort"} />
    </div>
  );
}

export default StudentFilter;

function SelctFilter({ data, lebal, text, value, onChange, isObject = false  }) {
  return (
    <div className="space-y-1">
      <h1 className=" text-sm font-medium">{lebal}</h1>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-zinc-50  font-medium shadow-none py-5">
          <SelectValue placeholder={text} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{lebal}</SelectLabel>
            {data.map((item, index) => {
              return (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
