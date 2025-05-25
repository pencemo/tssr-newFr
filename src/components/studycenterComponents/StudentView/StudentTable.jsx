import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
  
  
  export function StudentTable({data}) {
    const navigate = useNavigate()
    return (
      <Table className='border-b'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px]">NO</TableHead>
            <TableHead className="w-[100px]">Profile</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead >Year</TableHead>
            <TableHead >Reg. NO</TableHead>
            <TableHead ></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i+1}</TableCell>
              <TableCell className="font-medium">
                <Avatar>
                    <AvatarImage className='object-cover' src={item.profileImage?item.profileImage :"https://github.com/shadcn.png"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{item.studentName}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.courseName}</TableCell>
              <TableCell>{item.batchMonth}</TableCell>
              <TableCell >{item.year}</TableCell>
              <TableCell >{item.registrationNumber}</TableCell>
              <TableCell >
                <Button variant='outline' size='sm' onClick={()=>navigate(`view/${item.enrollmentId}`)}>View student</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }

