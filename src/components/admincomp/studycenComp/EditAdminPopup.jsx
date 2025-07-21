import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export function EditAdminPopup({ isOpen, setIsOpen, admin, onSubmit, mode}) {
  const [localAdmin, setLocalAdmin] = useState({ name: "", email: "", phoneNumber: "", password: "" });
  const [isError, setError]=useState(false)

useEffect(() => {
  if (isOpen) {
    setLocalAdmin(admin || { name: "", email: "", phoneNumber: "", password: "" });
  }
}, [admin, isOpen]);

const handleChange = (e) => {
  setLocalAdmin({ ...localAdmin, [e.target.name]: e.target.value });
};

const handleSave = () => {
  if (
    localAdmin.name.trim() === "" ||
    localAdmin.email.trim() === "" ||
    localAdmin.phoneNumber.trim() === "" ||
    (mode === "add" && localAdmin.password.trim() === "")
  ) {
    setError(true)
    return;
  }
  onSubmit(localAdmin);
};
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>{mode === "add" ? "Add New Admin" : "Edit Admin"}</DialogTitle>
      <DialogDescription>
        {mode === "add"
          ? "Create a new admin for this center"
          : "Update the selected admin"}
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
      {/* Name */}
      <InputField
        label="Name"
        name="name"
        value={localAdmin.name}
        onChange={handleChange}
        error={isError && localAdmin.name === ""}
      />
      {/* Phone */}
      <InputField
        label="Phone Number"
        name="phoneNumber"
        value={localAdmin.phoneNumber}
        onChange={handleChange}
        error={isError && localAdmin.phoneNumber === ""}
      />
      {/* Email */}
      <InputField
        label="Email"
        name="email"
        value={localAdmin.email}
        onChange={handleChange}
        error={isError && localAdmin.email === ""}
      />
      {/* Password */}
      <InputField
        label="Password"
        name="password"
        type="password"
        value={localAdmin.password}
        onChange={handleChange}
        error={isError && mode === "add" && localAdmin.password === ""}
        helperText={
          mode === "add"
            ? "Password is required"
            : "Leave password empty if you don’t want to change it"
        }
      />
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button onClick={handleSave}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}


function InputField({ label, name, value, onChange, error, type = "text", helperText }) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        className={error ? "border-red-500" : ""}
      />
      {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
    </div>
  );
}
