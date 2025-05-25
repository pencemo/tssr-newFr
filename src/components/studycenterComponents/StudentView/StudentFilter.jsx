import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const currentYear = new Date().getFullYear();
const oldYears = Array.from({ length: 20 }, (_, i) => currentYear - i);

function StudentFilter({ filters, onFilterChange, courses , onClear}) {
   const [batches, setBatches] = useState([]);
  return (
    <div className="w-full flex max-md:flex-col items-end justify-between gap-2 rounded-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 w-full max-w-4xl">
      <SelctFilter
        data={courses || []}
        isObject
        text={"Select Course"}
        value={filters.course}
        onChange={(value) => {
          const batch = courses.find((item) => item.courseId === value)?.batches;
          setBatches(batch);
          onFilterChange("course", value)
        } }
        lebal={"Course"}
      />
      <SelctFilter
        disabled={batches.length === 0}
        data={batches}
        isObject
        text={"Select Batch"}
        value={filters.batch}
        onChange={(value) => onFilterChange("batch", value)}
        lebal={"Batch"}
      />
      <SelctFilter
        data={oldYears}
        text={"Select Year"}
        value={filters.year}
        onChange={(value) => onFilterChange("year", value)}
        lebal={"Year"}
      />
      <SelctFilter
        data={oldYears}
        text={"Sort by"}
        value={filters.sort}
        onChange={(value) => onFilterChange("sort", value)}
        lebal={"Sort"}
      />
      </div>
      <Button onClick={onClear} variant='outline' className='shadow-none py-5'>Clear filter</Button>
    </div>
  );
}

export default StudentFilter;

function SelctFilter({ data, lebal, text, value, onChange, isObject = false, disabled =false }) {
  return (
    <div className="space-y-1">
      {/* <h1 className=" text-sm font-medium">{lebal}</h1> */}
      <Select value={value} onValueChange={onChange} disabled={disabled} >
        <SelectTrigger className="w-full bg-zinc-50  shadow-none py-5">
          <SelectValue placeholder={text} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{lebal}</SelectLabel>
            {isObject ? (
              data.map((item, index) => (
                <SelectItem key={index} value={item.courseId || item._id}>
                  {item.courseName || item.month}
                </SelectItem>
              ))
            ) : (
              <>
                {data.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
