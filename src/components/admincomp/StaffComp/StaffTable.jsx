import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import { Edit, Trash2, Mail, User, PencilLine, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Delete02Icon, Edit02Icon } from "hugeicons-react";

export function StaffTable({ data, onEdit,onDelete  }) {

  return (
    <div className=" border-b">
      <Table>
        <TableHeader className='uppercase'>
          <TableRow className="hover:bg-muted/50">
            <TableHead className="w-[60px] font-semibold">No</TableHead>
            <TableHead >Name of Staff</TableHead>
            <TableHead >Contact No</TableHead>
            <TableHead >Email</TableHead>
            <TableHead >Staff ID</TableHead>
            <TableHead >Designation</TableHead>
            <TableHead >Dipartment</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((staff, index) => (
            <TableRow key={staff._id || index} className="hover:bg-muted/30">
              <TableCell className="font-medium">{index + 1}</TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={staff.profileImage} alt={staff.name} />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                    <p className="font-medium leading-none">{staff.name}</p> 
                  
                </div>
              </TableCell>

              <TableCell> {staff.phoneNumber} </TableCell>
              <TableCell> {staff.email} </TableCell>
              <TableCell> {staff.staffId} </TableCell>
              <TableCell> {staff.designation} </TableCell>
              <TableCell> {staff.department} </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(staff)}
                  >
                    <Edit02Icon size={10} strokeWidth={2}/> 
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-destructive border-destructive/20 hover:bg-destructive hover:text-white bg-transparent"
                    onClick={() => {onDelete(staff._id)}}
                  >
                    <Delete02Icon size={10} strokeWidth={2} />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </div>
  );
}
