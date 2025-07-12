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

export function EditStudy({ data, course }) {
   
  const [isError, setError] = useState(false);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
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
  }, [data]);

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
    mutate({formData, id : data._id}, {
      onSuccess: (data) => { 
        if(data.success){
          toast("Study centre updated", {
            description: 'Study centre updated successfully',});
          // handleCancel()
          navigate('/admin/studycentre')
        }else{
          toast("Somthing went wrong", {
            description: data.message,});
            setError(data.message)
        }
      }
    })
  }

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
