import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetStudyCenterForExcel } from "@/hooks/tanstackHooks/useStudyCentre";
import { useState } from "react";
import { SubjectSelect } from "../courseComp/SubjectSelect";

export function CreateNotification() {
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState("");
  const [isOpen, setOpen] = useState(false);
  const { data } = useGetStudyCenterForExcel();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const { mutate, isPending } = useCreateNotifications();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    attachedFileUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setOpen(false);
    setFile(null);
    setFormData({
      title: "",
      description: "",
      attachedFileUrl: "",
    });
    setError(null);
    setCategory("");
    setSelected([]);
  };

  // submit formData
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try{

    
    if (!formData.title || !formData.description || !category) {
      setError("Please fill all the fields");
      return;
    }
    let fileUrl;
    if (file) {
      fileUrl = await uploadFile(file);
      if (!fileUrl) {
        setError("Error uploading file");
        return;
      }
    }

    const data = {
      ...formData,
      category,
      ...(fileUrl?.url && { attachedFileUrl: fileUrl.url }),
      ...(selected?.length > 0 && { receiverId: selected }),
    };

    mutate(data, {
      onSuccess: (data) => {
        if (data.success) {
          handleCancel();
          toast.success("Notification created successfully");
        } else {
          setError(data.message);
          toast.error(data.message);
        }
      },
      onError: (error) => {
        setError(error.message);
        toast.error("Somthing went wrong");
      },
    });
  }catch(error){
    setError('Somthing went wrong')
  }finally{
    setLoading(false);
  }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Creat Notification</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Create Notification</DialogTitle>
          <DialogDescription>
            Create a new notification to inform the study centre about new
            important updates.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={handleChange}
              id="title"
              name="title"
              placeholder="Title"
              className={error && formData.title === "" ? 'border-red-500' : ''}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              onChange={handleChange}
              id="description"
              name="description"
              placeholder="Type your message here."
              className={error && formData.description === "" ? 'border-red-500' : ''}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="File">File (Optional)</Label>
            <Input
              onChange={(e) => setFile(e.target.files[0])}
              id="File"
              type="file"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="Category">Category</Label>
            <SelectCategory error={error && category === ""} category={category} setCategory={setCategory} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="items">Select Center (Optional)</Label>
            <SubjectSelect
              error={false}
              onChange={setSelected}
              placeholder="Select Center"
              className=""
              options={data ? data.data : []}
              selected={selected}
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            {isPending || isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateNotifications } from "@/hooks/tanstackHooks/useNotifications";
import { uploadFile } from "@/lib/s3Service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const categorys = [
  "Exam Schedule",
  "Settings Update",
  "Course Updates",
  "Admission Info",
  "Important Dates",
  "Faculty Information",
  "File Upload",
  "Other Information",
];

function SelectCategory({ category, setCategory , error }) {
  return (
    <Select selected={category} onValueChange={(value) => setCategory(value)}>
      <SelectTrigger className={`w-full ${error && 'border-red-500'}`}>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {categorys.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
