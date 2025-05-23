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
import { TableComp } from "@/components/admincomp/studycenComp/Table";
import { useStudyCentre } from "@/hooks/tanstackHooks/useStudyCentre";
import { useNavigate } from "react-router-dom";
import { MenuButtons } from "@/components/admincomp/studycenComp/MenuButtons";

export function StudyCentre() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studyCenters, setStudyCenters] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 1000); // delay in ms

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading } = useStudyCentre(currentPage, 20, debouncedSearch);

  

  useEffect(() => {
    if (data && data.data) {
      setStudyCenters(data.data);
    }
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  if (error) {
    return <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
    Error to fetch data
  </div>;
  }

  return (
    <div className=" w-full h-full">
      <div className="space-y-6 w-full h-full">
        <div className="flex max-sm:flex-col gap-2 justify-between items-center">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            type="text"
            placeholder="Search users..."
            className="max-w-sm max-sm:max-w-full"
          />
          <div className="max-sm:w-full flex items-center justify-center gap-2">
            <Button className={''} size='' onClick={()=>navigate('/admin/studycentre/add')}>Add Study Centre</Button>
            <MenuButtons/>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : studyCenters.length > 0 ? (
          <div className="rounded-md border">
            <TableComp
              data={studyCenters}
            />
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
        ) : (
          <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
            No data found
          </div>
        )}
      </div>
    </div>
  );
}
