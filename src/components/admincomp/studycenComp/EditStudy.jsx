import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";
import { DateInputs, FormInputs, StateSelect } from "./CreateStudy";
import { MultiSelect } from "@/components/ui/multiselect";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useUpdateSutdyCenter } from "@/hooks/tanstackHooks/useStudyCentre";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { EditAdminPopup } from "./EditAdminPopup";

export function EditStudy({ data, course, users }) {
  
   
  const [isError, setError] = useState(false);
  const [admins, setAdmins] = useState([])
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [centerAdmin, setCenterAdmin]=useState({})
  const {mutate}=useUpdateSutdyCenter()
  const [formData, setFormData] = useState({
    name: "",
    centerHead: "",
    email: "",
    phoneNumber: "",
    renewalDate: new Date(),
    state: "",
    district: "",
    place: "",
    pincode: "",
    courses: [],
    isActive: true,
    isApproved: true,
  });
 
  useEffect(() => {
    setFormData({ ...formData, renewalDate: date, courses: selected });
  }, [date, selected]);

  useEffect(() => {
    setFormData({ ...formData, ...data });
    setDate(new Date(data.renewalDate));
    setSelected(data.courses);
    setAdmins(users);
  }, [data, users]);

  const handleChange = useMemo(
    () => (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.centerHead === "" ||
      formData.email === "" ||
      formData.phoneNumber === "" ||
      formData.state === "" ||
      formData.district === "" ||
      formData.place === "" ||
      formData.pincode === "" ||
      selected.length === 0
    ) {
      setError(true);
    }
    const submitData = {
      ...formData,
      users: admins,
    }
    mutate({formData: {submitData}, id : data._id}, {
      onSuccess: (data) => { 
        if(data.success){
          toast.success("data.message");
          navigate('/admin/studycentre')
        }else{
          toast("Somthing went wrong", {
            description: data.message,});
        }
      }
    })
  }

  // Add in EditStudy component
const [adminDialogOpen, setAdminDialogOpen] = useState(false);
const [adminDialogMode, setAdminDialogMode] = useState("add"); // "add" or "edit"
const [editingIndex, setEditingIndex] = useState(null); // track which admin is being edited

const openAddAdmin = () => {
  setCenterAdmin({ name: "", email: "", phoneNumber: "", password: "" });
  setAdminDialogMode("add");
  setAdminDialogOpen(true);
};

const openEditAdmin = (admin, index) => {
  setCenterAdmin(admin);
  setAdminDialogMode("edit");
  setEditingIndex(index);
  setAdminDialogOpen(true);
};

const handleSetAdmin = (updatedAdmin) => {
  if (!updatedAdmin.name || !updatedAdmin.email || !updatedAdmin.phoneNumber) {
    setError(true);
    return;
  }

  if (adminDialogMode === "edit") {
    const updatedAdmins = [...admins];
    updatedAdmins[editingIndex] = updatedAdmin;
    setAdmins(updatedAdmins);
  } else {
    const isDuplicate = admins.some(
      (a) =>
        a.email === updatedAdmin.email ||
        a.phoneNumber === updatedAdmin.phoneNumber
    );
    if (isDuplicate) {
      toast.error("Admin already exists");
      return;
    }
    setAdmins([...admins, updatedAdmin]);
  }

  // Reset
  setCenterAdmin({});
  setEditingIndex(null);
  setAdminDialogOpen(false);
};

  return (
    <div className=" space-y-3 mt-6">
      <FormInputs
        name="Name"
        id="name"
        onChange={handleChange}
        value={formData.name}
        error={isError && formData.name === ""}
      />
      <FormInputs
        name="Center Head"
        id="centerHead"
        onChange={handleChange}
        value={formData.centerHead}
        error={isError && formData.centerHead === ""}
      />
      <FormInputs
        name="Email"
        id="email"
        onChange={handleChange}
        value={formData.email}
        error={isError && formData.email === ""}
      />
      <FormInputs
        name="Phone Number"
        id="phoneNumber"
        onChange={handleChange}
        value={formData.phoneNumber}
        error={isError && formData.phoneNumber === ""}
      />
      <DateInputs
        name="Renewal Date"
        id="renewalDate"
        date={date}
        setDate={setDate}
      />
      <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
        <div className="sm:col-span-3">
          <Label htmlFor="Address" className="col-span-3">
            Selected Course
          </Label>
        </div>
        <div className="sm:col-span-9">
          <MultiSelect
            options={course}
            selected={selected}
            onChange={setSelected}
            placeholder="Select items"
            error={isError && selected.length === 0}
          />
        </div>
      </div>

      <div className="mt-6 mb-4 border-t">
        <h1 className="text-lg font-medium mt-4">Address</h1>
        <p className="text-sm text-muted-foreground">
          Submit address of the study centre
        </p>
      </div>

      <StateSelect
        name="Address"
        setFormData={setFormData}
        formData={formData}
        error={isError}
      />

      <FormInputs
        name="Place"
        id="place"
        onChange={handleChange}
        value={formData.place}
        error={isError && formData.place === ""}
      />
      <FormInputs
        name="Pincode"
        id="pincode"
        onChange={handleChange}
        value={formData.pincode}
        error={isError && formData.pincode === ""}
      />

      <div className="mt-6 mb-4 border-t">
        <h1 className="text-lg font-medium mt-4">Permissions</h1>
        <p className="text-sm text-muted-foreground">
          Manage permissions for the study centre
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <SwitchCard
          checked={formData.isActive}
          action={(checked) => setFormData({ ...formData, isActive: checked })}
          title="Activate Status"
          description="Status of the Study Centre"
        />
        <SwitchCard
          checked={formData.isApproved}
          action={(checked) =>
            setFormData({ ...formData, isApproved: checked })
          }
          title="Approvel Status"
          description="Status of the Study Centre"
        />
      </div>

      <div className="mt-6 mb-4 border-t pt-4 flex max-md:flex-col gap-2 justify-between">
        <div>
        <h1 className="text-lg font-medium ">Center Admins</h1>
        <p className="text-sm text-muted-foreground">
          Manage admins of center
        </p>
          
        </div>
          <Button onClick={openAddAdmin}>Add new admin</Button>
      </div>
      <div>
        <div className="space-y-2">
        {admins?.map((admin, index) => (
          <div key={index} className="grid sm:grid-cols-4 items-center md:grid-cols-1 lg:grid-cols-4 gap-2 border py-2 px-4 rounded-lg hover:bg-primary-foreground transition-all">
            <h1 className="text-sm font-medium">{admin.name}</h1>
            <h1 className="text-sm text-muted-foreground">{admin.email}</h1>
            <h1 className="text-sm text-muted-foreground">{admin.phoneNumber}</h1>
            <Button className='justify-self-end' size='sm' variant='outline' onClick={() => openEditAdmin(admin, index)}>Edit admin</Button>
          </div>
        ))}
        </div>
        <EditAdminPopup
          isOpen={adminDialogOpen}
          setIsOpen={setAdminDialogOpen}
          admin={centerAdmin}
          onSubmit={handleSetAdmin}
          isError={isError}
          mode={adminDialogMode}
        />
      </div>
      <div className="mt-6 mb-4 border-t">
        <h1 className="text-lg font-medium mt-4">Change Application</h1>
        <p className="text-sm text-muted-foreground mt-1">
          This action will be changed all the information of the study centre
          and it will be effected all data to connected the study centre.
        </p>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <Button onClick={()=>navigate('/admin/studycentre')} variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Save changes</Button>
      </div>
    </div>
  );
}


function SwitchCard({ title, description, checked, action }) {
  return (
    <div>
      <Card
        className={
          "shadow-none p-4 md:p-6 flex flex-row justify-between items-center"
        }
      >
        <div>
          <h1 className="font-medium">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={action} />
      </Card>
    </div>
  );
}
