import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { EditStudy } from "./EditStudy";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CopyToClipbord from "@/components/ui/CopyToClipbord";
import { Edit02Icon, ViewIcon } from "hugeicons-react";

export function TableComp({ data }) {
  const navigate = useNavigate();
  return (
    <Table className={"border-b"}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          {[
            "Name",
            "ATC Id",
            "Email",
            "Phone",
            "Expired At",
            "Status",
            "",
          ].map((item, i) => (
            <TableHead key={i} className="">
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell className="font-medium md:w-80  md:whitespace-normal md:break-words ">{item.name}</TableCell>
            <TableCell><CopyToClipbord text={item.atcId}/></TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phoneNumber}</TableCell>
            <TableCell className="">
              {format(new Date(item.renewalDate), "dd MMM yyyy")}
            </TableCell>
            <TableCell>
              {item.isActive ? (
                <Badge variant="outline" className='rounded-full w-full max-w-24'>Active</Badge>
              ) : (
                <Badge variant="destructive" className='rounded-full w-full max-w-24 bg-red-500'>Not Active</Badge>
              )}
            </TableCell>
            <TableCell className="space-x-2">
              <Button
              variant='outline'
              className='h-8'
                onClick={() => navigate(`/admin/studycentre/view/${item._id}`)}
              >
                View <ViewIcon/>
              </Button>
              <Button
              variant=''
              className='h-8'
                onClick={() => navigate(`/admin/studycentre/edit/${item._id}`)}
              >
                Edit <Edit02Icon/> 
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
