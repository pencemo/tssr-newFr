import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourseOfStudyCenter, useGetStudyCenterForExcel } from "@/hooks/tanstackHooks/useStudyCentre";
import { useAuth } from "@/Context/authContext";

function SelectDropDown({ filters, setFilters , error}) {
  const { data: course } = useCourseOfStudyCenter();
  const [batchs, setBatches] = useState([]);
  const {data: center}=useGetStudyCenterForExcel()
  const {user}=useAuth()

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const currentYear = new Date().getFullYear();
  const oldYears = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-3 ">
      {/* Sort Option */}
      {user.isAdmin && <DlFilter
          data={center?.data || []}
          text={"Select Center"}
          value={filters?.studycenterId}
          onChange={(value) => handleFilterChange("studycenterId", value)}
          lebal={"studycenterId"}
          error={false}
          isObject={true}
        />}
      <div className="w-full space-y-3 ">
        <DlFilter
          data={course ? course.data : []}
          lebal="Course"
          text="Select Course"
          value={filters.course}
          onChange={(value) => {
            const batch = course.data.find(
              (item) => item.courseId === value
            )?.batches;
            setBatches(batch);
            handleFilterChange("course", value);
          }}
          isObject={true}
          error={error && filters.course === ""}
        />
        <DlFilter
          disabled={batchs.length === 0}
          data={batchs}
          isObject
          text={"Select Batch"}
          value={filters.batch}
          onChange={(value) => handleFilterChange("batch", value)}
          lebal={"Batch"}
          error={error && filters.batch === ""}
        />
        
        <DlFilter
          data={oldYears}
          text={"Select Year"}
          value={filters.year}
          onChange={(value) => handleFilterChange("year", value)}
          lebal={"Year"}
          error={error && filters.year === ""}
        />
      </div>
    </div>
  );
}

function DlFilter({
  data,
  lebal,
  text,
  value,
  onChange,
  isObject = false,
  disabled = false,
  error = false,
}) {
  return (
    <div className="space-y-1 w-full ">
      {/* <h1 className=" text-sm font-medium">{lebal}</h1> */}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          className={`w-full max-w-[350px] shadow-none  ${error ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder={text} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{lebal}</SelectLabel>
            {isObject ? (
              data.map((item, index) => (
                <SelectItem key={index} value={item.courseId || item._id}>
                  {item.courseName || item.month || item.name }
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

export default SelectDropDown;
