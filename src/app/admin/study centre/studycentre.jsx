import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { TableComp } from "@/components/admincomp/studycenComp/Table";
import { useStudyCentre } from "@/hooks/tanstackHooks/useStudyCentre";
import { useNavigate } from "react-router-dom";
import { MenuButtons } from "@/components/admincomp/studycenComp/MenuButtons";
import Pagination from "@/components/ui/Pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function StudyCentre() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
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

  const { data, error, isLoading } = useStudyCentre(currentPage, perPage, debouncedSearch);

  

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
            <Select onValueChange={(value)=>setPerPage(value)} >
          <SelectTrigger className={`w-full  bg-white border-accent shadow-none   `}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className=' '>
            <SelectGroup>
              {[10, 20, 50, 100].map((item) =><SelectItem value={item}>{item}</SelectItem>)}
            </SelectGroup>
          </SelectContent>
        </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : studyCenters.length > 0 ? (
          <div className="rounded-xl overflow-hidden border">
            <TableComp
              data={studyCenters}
            />
            <Pagination totalData={data?.totalItems} currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
            
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
