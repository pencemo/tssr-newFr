// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table";
//   import { format } from "date-fns";
//   //   import { DeleteAlert } from "./DeletAlert";
//   //   import { EditStudy } from "./EditStudy";
//   import { useNavigate } from "react-router-dom";
//   import { Badge } from "@/components/ui/badge";
//   import { Button } from "@/components/ui/button";
//   import { Switch } from "@/components/ui/switch";
  
//   export function StaffTable({ data,  onEdit }) {
//     return (
//       <Table className="border-b ">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[50px] ">No</TableHead>
//             <TableHead >Name</TableHead>
//             <TableHead >Category</TableHead>
//             <TableHead >Duration</TableHead>
//             <TableHead >Batch</TableHead>
//             <TableHead ></TableHead>
           
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((item, i) => (
//             <TableRow key={i}>
//               <TableCell className="font-medium">{i + 1}</TableCell>
//               <TableCell className="font-medium">{item.courseId.name}</TableCell>
//               <TableCell>{item.courseId.category}</TableCell>
//               <TableCell>{item.courseId.duration}</TableCell>
//               <TableCell>{item.month}</TableCell>
//               <TableCell>
//                 <Button
//                   variant="outline"
//                   className="h-8 shadow-none"
//                   onClick={() => onEdit(item)}
//                 >
//                   Edit date
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     );
//   }
  




"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Mail, User } from "lucide-react";
import { AddStaff } from "./AddStaff";
import { useState } from "react";

export function StaffTable({ data, onEdit, formData, setFormData }) {
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleStatusChange = (staff, checked) => {
    console.log(`Toggling status for ${staff.name}:`, checked);
    // Handle status change logic here
  };

  const handleEditSubmit = (formData, editData) => {
    console.log("Editing staff:", editData._id, formData);
    // Handle edit submission here
    // You can call your API or parent function
  };

  const getRoleBadgeVariant = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "destructive";
      case "teacher":
        return "default";
      case "coordinator":
        return "secondary";
      case "staff":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 hover:bg-green-100"
      >
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        Inactive
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead className="w-[60px] font-semibold">No</TableHead>
            <TableHead className="font-semibold">Staff Details</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">
              Email
            </TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold hidden sm:table-cell">
              Status
            </TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((staff, index) => (
            <TableRow key={staff._id || index} className="hover:bg-muted/30">
              <TableCell className="font-medium">{index + 1}</TableCell>

              {/* Staff Details - Responsive */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <p className="font-medium leading-none">Muhamed Sadhin</p>
                    <p className="text-sm text-muted-foreground md:hidden flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {staff.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Email - Hidden on mobile */}
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span className="text-sm">muhamedsadhin@gmail.com</span>
                </div>
              </TableCell>

              {/* Role */}
              <TableCell>
                <Badge
                  variant={getRoleBadgeVariant(staff.role)}
                  className="capitalize"
                >
                  Administration Staff
                </Badge>
              </TableCell>

              {/* Status - Hidden on small screens */}
              <TableCell className="hidden sm:table-cell">
                <div className="flex items-center gap-2">
                  {getStatusBadge(staff.isActive !== false)}
                  <Switch
                    checked={staff.isActive !== false}
                    onCheckedChange={(checked) =>
                      handleStatusChange(staff, checked)
                    }
                    size="sm"
                  />
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* Edit Button using AddStaff component */}

                  {/* Delete Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-destructive border-destructive/20 hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                    onClick={() => onEdit(staff)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* Empty State */}
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-2">
                  <User className="h-8 w-8 opacity-50" />
                  <p>No staff members found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
