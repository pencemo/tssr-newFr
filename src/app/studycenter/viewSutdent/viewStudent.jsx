import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useCourseOfStudyCenter, useGetStudyCenterForExcel } from "@/hooks/tanstackHooks/useStudyCentre";
import { useNavigate } from "react-router-dom";
import { StudentTable } from "@/components/studycenterComponents/StudentView/StudentTable";
import StudentFilter from "@/components/studycenterComponents/StudentView/StudentFilter";
import { useStudentOfStudyCenter } from "@/hooks/tanstackHooks/useStudents";
import NoData from "@/components/ui/noData";
import { StudentDl } from "@/components/studycenterComponents/StudentView/StudentDl";
import { useAuth } from "@/Context/authContext";
import Pagination from "@/components/ui/Pagination";
import { HiOutlineXMark } from "react-icons/hi2";

export function ViewStudent() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { data:course } = useCourseOfStudyCenter()
  const {data:studycenter}=useGetStudyCenterForExcel()
  const {user}=useAuth()
  const [filters, setFilters] = useState({
    course: "",
    batch: "",
    year: "",
    sort: "",
    studyCentre: ""
  });
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading } = useStudentOfStudyCenter(
    currentPage,
    10,
    debouncedSearch,
    filters.course,
    filters.batch,
    filters.year,
    filters.sort,
    filters.studyCentre,
  );

  useEffect(() => {
    if (data && data.data) {
      setStudents(data.data);
      console.log(data);
    }
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
        Error to fetch data
      </div>
    );
  }

  return (
    <div className=" w-full h-full">
      <div className="space-y-6 w-full h-full">
        <div>
          <h1 className="text-2xl font-bold">Students Data</h1>
        </div>
        <div className=" ">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search Student"
            className="max-w-sm max-sm:max-w-full"
          />
          
        </div>
        
        <div className="w-full flex max-md:flex-col  md:justify-between gap-2 ">
           
        <StudentFilter
              courses={course?.data}
              studycenter={studycenter?.data}
              filters={filters}
              onFilterChange={handleFilterChange}
              
            />
          <div className="grid grid-cols-2 gap-2">
          <Button onClick={() =>{
                setFilters({
                  course: "",
                  batch: "",
                  year: "",
                  sort: "",
                  studyCentre: ''
                }
                )
              }} variant='outline'  >
                <HiOutlineXMark size={26}/></Button> 
              <StudentDl/>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : students.length > 0 ? (
          <>
            
            <div className="rounded-md border">
              <StudentTable data={students} />
              <Pagination totalData={data?.totalData} currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
            </div>
          </>
        ) : (
          <NoData/>
        )}
      </div>
    </div>
  );
}

export default ViewStudent;
