import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVerticalIcon,
} from "lucide-react";
import Loader from "@/components/ui/loader";
import { useCourseOfStudyCenter } from "@/hooks/tanstackHooks/useStudyCentre";
import { useNavigate } from "react-router-dom";
import { StudentTable } from "@/components/studycenterComponents/StudentView/StudentTable";
import StudentFilter from "@/components/studycenterComponents/StudentView/StudentFilter";
import { useStudentOfStudyCenter } from "@/hooks/tanstackHooks/useStudents";
import NoData from "@/components/ui/noData";
import { StudentDl } from "@/components/studycenterComponents/StudentView/StudentDl";

export function ViewStudent() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { data:course } = useCourseOfStudyCenter()
  const [filters, setFilters] = useState({
    course: "",
    batch: "",
    year: "",
    sort: "",
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
    filters.sort
  );

  useEffect(() => {
    if (data && data.data) {
      setStudents(data.data);
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
        <div className="flex max-sm:flex-col gap-2 justify-between items-center">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search users..."
            className="max-w-sm max-sm:max-w-full"
          />
          <div className="max-sm:w-full flex items-center justify-center gap-2">
            <Button onClick={() => navigate("/studycenter/admission")}>
              Add Student
            </Button>
            <StudentDl/>
          </div>
        </div>
        
        <StudentFilter
              courses={course?.data}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={() =>{
                setFilters({
                  course: "",
                  batch: "",
                  year: "",
                  sort: "",
                }
                )
              }}
            />
        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : students.length > 0 ? (
          <>
            
            <div className="rounded-md border">
              <StudentTable data={students} />
              <div className="flex items-center sm:justify-end justify-between space-x-2 py-4 px-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPage}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPage))
                  }
                  disabled={currentPage === totalPage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPage)}
                  disabled={currentPage === totalPage}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
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
