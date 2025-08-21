import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCourseOfStudyCenter } from '@/hooks/tanstackHooks/useStudyCentre';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function EditCourseNBatch({editCours, setEditCours}) {
    const { data: course } = useCourseOfStudyCenter();
    const [batches, setBatches] = useState([])

    const currentYear = new Date().getFullYear()+10;
    const oldYears = Array.from({ length: 16 }, (_, i) => currentYear - i);

    const handleFilterChange = (filterName, value) => {
        setEditCours((prev) => ({
          ...prev,
          [filterName]: value,
        }));
      };

      useEffect(()=>{
        if(course && editCours?.courseId){
            const batch = course?.data?.find((item) => item.courseId === editCours?.courseId)?.batches;
            setBatches(batch);
        }
      }, [course, editCours])

  return (
    <div className="grid geid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <SelctFilter
        data={course?.data || []}
        isObject
        text={"Select Course"}
        value={editCours?.courseId}
        onChange={(value) => {
          const batch = course?.data?.find((item) => item.courseId === value)?.batches;
          setBatches(batch);
          handleFilterChange("courseId", value)
        } }
        lebal={"Course"}
      />
      <SelctFilter
        disabled={batches.length === 0}
        data={batches}
        isObject
        text={"Select Batch"}
        value={editCours?.batchId}
        onChange={(value) => handleFilterChange("batchId", value)}
        lebal={"Batch"}
      />
      <SelctFilter
        data={oldYears}
        text={"Select Year"}
        value={editCours?.year}
        onChange={(value) => handleFilterChange("year", value)}
        lebal={"Year"}
      />
        </div>
  )
}

export default EditCourseNBatch



function SelctFilter({ data, lebal, text, value, onChange, isObject = false, disabled =false }) {
    const [search, setSearch] = useState("");
  
    // filter items based on search text
    const filteredData = data?.filter((item) => {
      const label = isObject
        ? String(item.courseName || item.month || item.name || "").toLowerCase()
        : String(item || "").toLowerCase();
    
      return label.includes(search.toLowerCase());
    });
  
    
    return (
      <div className="space-y-1">
        <h1 className=" text-sm font-medium">{lebal}</h1>
        <Select value={value} onValueChange={onChange} disabled={disabled} >
          <SelectTrigger className="w-full bg-zinc-50  shadow-none  ">
            <SelectValue placeholder={text} />
          </SelectTrigger>
          <SelectContent className='w-full max-w-md'>
            {/* Search Input */}
            <div className="p-2">
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8"
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
            <SelectGroup>
              <SelectLabel>{lebal}</SelectLabel>
              {isObject ? (
                filteredData.map((item, index) => (
                  <SelectItem key={index} value={item.courseId || item._id}>
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
  