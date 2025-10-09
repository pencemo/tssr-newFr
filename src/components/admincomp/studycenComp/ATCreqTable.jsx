import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { format } from "date-fns";
  import { useNavigate } from "react-router-dom";
  import { Button } from "@/components/ui/button";
  import CopyToClipbord from "@/components/ui/CopyToClipbord";
  
  export function ATCreqTable({ data , onAccept, onReject}) {
    const navigate = useNavigate();
    return (
      <Table >
        <TableHeader className='uppercase'>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            {[
              "Name",
              "Email",
              "Center Head",
              "Phone",
              "Address",
              "Date",
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
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.centerHead}</TableCell>
              <TableCell><CopyToClipbord text={item.phoneNumber}/></TableCell>
              <TableCell>{item.district}, {item.place}, {item.pincode}</TableCell>
              <TableCell className="">
                {format(new Date(item.createdAt), "dd MMM yyyy")}
              </TableCell>
              
              <TableCell className="space-x-2">
                <Button variant='' className='h-8'
                  onClick={() => onAccept(item._id)}
                >
                  Accepte
                </Button>
                <Button variant='destructive' className='h-8'
                  onClick={() => onReject(item._id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  