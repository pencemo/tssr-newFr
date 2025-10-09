import React, { useRef, useState } from "react";
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
import { useAuth } from "@/Context/authContext";
import { Input } from "@/components/ui/input";

const currentYear = new Date().getFullYear()+1;
const oldYears = Array.from({ length: 16 }, (_, i) => currentYear - i);

function StudentFilter({ filters, onFilterChange, courses , studycenter}) {
   const [batches, setBatches] = useState([]);
   const {user}=useAuth()
  return (
    // <div className="w-full flex max-md:fle x-col items-end justify-between gap-2 rounded-xl">
      <>
        {user?.role === "admin" &&
        <SelctFilter
        data={studycenter || []}
        isObject
        text={"Select Centre"}
        value={filters.studyCentre}
        onChange={(value) => {
          onFilterChange("studyCentre", value)
        }}
        lebal={"Study Centre"}
      />
        }
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
      </>
    // </div>
  );
}

export default StudentFilter;

function SelctFilter({ data, lebal, text, value, onChange, isObject = false, disabled =false }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null)
  // filter items based on search text
  const filteredData = data.filter((item) => {
    const label = isObject
      ? String(item.courseName || item.month || item.name || "").toLowerCase()
      : String(item || "").toLowerCase();
  
    return label.includes(search.toLowerCase());
  });

  const handleInputKeyDown = (e) => {
    // Prevent the Select component from handling these events
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    // Allow normal input behavior for all keys except Escape
    if (e.key === "Escape") {
      inputRef.current?.blur()
    } 
  }

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    // Ensure input stays focused
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  
  return (
    <div className="space-y-1">
      {/* <h1 className=" text-sm font-medium">{lebal}</h1> */}
      <Select  value={value} onValueChange={onChange} disabled={disabled} >
        <SelectTrigger className="w-full  shadow-none bg-white border-accent ">
          <SelectValue placeholder={text} />
        </SelectTrigger>
        <SelectContent
         className='w-full max-w-md'>
          {/* Search Input */}
          <div className="p-2">
            <Input
              placeholder="Search..."
              ref={inputRef}
              value={search}
              onChange={handleInputChange}
              className="h-8"
              onKeyDown={handleInputKeyDown}  // block radix typeahead
              onKeyUp={handleInputKeyDown}
              onKeyDownCapture={handleInputKeyDown}
            />
          </div>
          <SelectGroup >
            <SelectLabel>{lebal}</SelectLabel>
            {isObject ? (
              filteredData.map((item, index) => (
                <SelectItem  key={index} value={item.courseId || item._id}>
                  {item.courseName || item.month || item.name}
                </SelectItem>
              ))
            ) : (
              <>
                {filteredData.map((item, index) => (
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
