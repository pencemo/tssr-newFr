import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormInputs } from "../studycenComp/CreateStudy";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/ui/rangePicker";
import { useGetStudyCenterForExcel } from "@/hooks/tanstackHooks/useStudyCentre";
import { Input } from "@/components/ui/input";
import { Loader2, XIcon } from "lucide-react";
import { TimePicker } from "@/components/ui/timePicker";
import { useSceduleExam } from "@/hooks/tanstackHooks/useExam";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/ui/multiselect";
import { useAllCourse } from "@/hooks/tanstackHooks/useCourse";

export function CreateExam() {
  const [isError, setError] = useState(false);
  const [addError, setAddError] = useState(false)
  const [selected, setSelected]=useState([])
  const [isAllCourse, setAllCourse]=useState(false)
  const { data } = useGetStudyCenterForExcel();
  const {data:courses}=useAllCourse()
  const navigate = useNavigate();
  const {mutate, isPending, isSuccess}=useSceduleExam()
  const [selecteCenter, setSelectedCenter] = useState({centerId: "", newLocation: ""});
  const [date, setDate] = useState({
    from: null,
    to: null,
  });
  const [time, setTime] = useState({
    from: null,
    to: null,
  });
  const [formData, setFormData] = useState({
    examName: "",
    batch: "",
    year: "",
    changedCenters: [],
    date: {},
    time: {},
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleCancel = ()=>{
    navigate("/admin/examination")
    setFormData({
        examName: "",
        batch: "",
        changedCenters: [],
        year: "",
        date: {},
        time: {},

    })
    setError(false)
    setDate({
      from: null,
      to: null,
    })
    setTime({
      from: null,
      to: null,
    })
    setAddError(false)
    
  }

  const handleSubmit = async () => {
    setError(false);

    if (formData.examName === "" || formData.batch === "" || formData.year === "" || !date.from  || !date.to || !time.from  || !time.to ) {
      setError(true);
      return;
    }

    if(selected.length == 0 && !isAllCourse){
      setError(true);
      return;
    }

    const data = {
      examName: formData.examName,
      batch: formData.batch,
      year: formData.year,
      date: date,
      time: time,
      courses: selected,
      changedCenters: formData.changedCenters,
    }

    mutate(data, {
      onSuccess: (data)=>{
        if(data.success){
            toast.success(data.message)
           handleCancel()
        }else{
            toast.error(data.message)
        }
      }
    })
  };

 const currentYear = new Date().getFullYear()+1;
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);


  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleAddCenter = ()=>{
    setAddError(false)
    if(selecteCenter.centerId == "" || selecteCenter.newLocation == ""){
      setAddError(true)
      return
    }
    const isAvilabel = formData.changedCenters.find((center)=> center.centerId == selecteCenter.centerId) 
    if(isAvilabel){
      setFormData({...formData, changedCenters: [...formData.changedCenters.filter((center)=> center.centerId != selecteCenter.centerId), selecteCenter]})
      setSelectedCenter({centerId: "", newLocation: ""})
      return
    }
    setFormData({...formData, changedCenters: [...formData.changedCenters, selecteCenter]})
    setSelectedCenter({centerId: "", newLocation: ""})
  }

  const handleRemoveCenter = (centerId)=>{
    setFormData({...formData, changedCenters: [...formData.changedCenters.filter((center)=> center.centerId != centerId)]})
  }

  // if(isSuccess) return <div>sucsess</div>
  return (
    <div className="w-full max-w-[50rem] shadow-md mx-auto border rounded-2xl p-5 md:p-8">
        <div className="">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Schedule Exam</h2>
            <p className="text-sm text-gray-500">
              Scheduled new exam for selected batches of all course
            </p>
          </div>

          <div className="grid gap-4 py-4">
            <FormInputs
              name="Exam Name"
              id="examName"
              onChange={handleChange}
              value={formData.examName}
              error={isError && formData.examName === ""}
            />

            <SelectTag
              name="Batch of Exam"
              id="batch"
              options={monthNames}
              setFormData={setFormData}
              formData={formData}
              error={isError && formData.batch === ""}
            />

            <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
              <div className="sm:col-span-3 ">
                <Label htmlFor='courses'>Courses</Label>
              </div>
              <div className="sm:col-span-9">
                
              <div className="flex items-center gap-3 mb-2">
              <Checkbox checked={isAllCourse} onCheckedChange={(value)=>{
                setAllCourse(value)
                if(value){
                  setSelected([])
                }
              }} id="course" />
              <Label htmlFor="course">All Courses</Label>
              </div>
               <div>
               <MultiSelect
                  disabled={isAllCourse}
                  options={courses?.data}
                  selected={selected}
                  onChange={setSelected}
                  placeholder="Select Courses"
                  error={isError && selected.length === 0 && !isAllCourse}
                />
                <p className="text-xs text-muted-foreground mt-2"><span className="font-medium text-gray-700">Note:</span> If you select "All Courses", individual course selection will be disabled.</p>
               </div>
              </div>
            </div>

            <SelectTag
              name="Admission Year"
              id="year"
              options={years}
              setFormData={setFormData}
              formData={formData}
              error={isError && formData.year === ""}
            />

            <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
              <div className="sm:col-span-3 ">
                <Label htmlFor={"date"}>Exam Date</Label>
              </div>
              <div className="sm:col-span-9">
                {/* State Dropdown */}

                <DatePickerWithRange
                  setDate={setDate}
                  date={date}
                  error={isError}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
              <div className="sm:col-span-3 ">
                <Label htmlFor={"time"}>Exam Time</Label>
              </div>
              <div className="sm:col-span-9 grid grid-cols-2 gap-3">
                <TimePicker error={isError && !time.from} time={time.from} setTime={setTime} type={'from'} label="Start Time"/>
                <TimePicker error={isError && !time.to} time={time.to} setTime={setTime} type={'to'} label="End Time"/>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-lg font-semibold">Exam center</h1>
              <p className="text-sm text-gray-500">
                Change exam center of study centers (optionl)
              </p>
              <div className="mt-6 grid md:grid-cols-3 gap-4 ">
                <div className="space-y-2">
                    <Label htmlFor="center">Select Center</Label>
                <Select
                  value={selecteCenter?.centerId}
                  onValueChange={(value)=>setSelectedCenter({...selecteCenter, centerId: value})}
                >
                  <SelectTrigger
                    className={`w-full shadow-none ${
                        addError && selecteCenter.centerId === "" &&"border-red-500"
                    }`}
                  >
                    <SelectValue placeholder="Select Center" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.data?.map((item, i) => (
                      <SelectItem key={i} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newLocation">New Center</Label>
                    <Input
                      type="text"
                      name="newLocation"
                      id="newLocation"
                      placeholder="Enter new center"
                      value={selecteCenter?.newLocation}
                      onChange={(e)=>setSelectedCenter({...selecteCenter, newLocation: e.target.value})}
                      className={`w-full shadow-none ${
                        addError && selecteCenter.newLocation === "" && "border-red-500"
                      }`}
                    />
                </div>
                <div className=" self-end">
                    <Button onClick={handleAddCenter} className='w-full'>Add New Center</Button>
                </div>
                </div>
                 
                <div>
                    <div className=" space-y-2 mt-4">
                        {formData.changedCenters.map((item, i) =>{
                            const center = data?.data?.find((center)=>center._id === item.centerId)
                            return (
                                <div key={i} className="relative items-center grid md:grid-cols-2 group bg-primary-foreground p-2 rounded-md gap-2">
                                    <p className="text-sm text-muted-foreground">{center.name}</p>
                                    <p className="text-sm font-medium">{item.newLocation}</p>
                                    <div onClick={()=>handleRemoveCenter(item.centerId)} className="absolute right-3 md:opacity-0 group-hover:opacity-100 text-primary hover:bg-white transition-all duration-200 rounded-full p-1 cursor-pointer">
                                        <XIcon size={16} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
              </div>

              <div className="border-t pt-5">
                <p className="text-sm text-muted-foreground">Once the exam schedule is finalized, an automated notification will be sent to all study centers, informing them of the exam details. Additionally, students enrolled in the respective batches will be able to conveniently access and download their hall tickets directly from the portal</p>
                {isError &&  <p className="text-sm text-red-500 mt-1">Please fill all required fields</p>}
              </div>

            </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCancel} variant="outline">Cancel and back</Button>
            <Button onClick={handleSubmit} type="submit">
           {isPending? <Loader2 className="animate-spin"/>:" Schedule Exam"}
            </Button>
          </div>
        </div>
    </div>
  );
}

const SelectTag = ({ name, id, options, setFormData, formData, error }) => {
  const handleStateChange = (selected) => {
    setFormData({ ...formData, [id]: selected });
  };

  return (
    <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
      <div className="sm:col-span-3 ">
        <Label htmlFor={name}>{name}</Label>
      </div>
      <div className="sm:col-span-9">
        {/* State Dropdown */}
        <Select value={formData?.[id]} onValueChange={handleStateChange}>
          <SelectTrigger
            className={`w-full py-5 shadow-none ${error && "border-red-500"}`}
          >
            <SelectValue placeholder={name} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((item, i) => (
              <SelectItem key={i} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
