import { AddCourse } from "@/components/admincomp/courseComp/AddCourse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateCourse } from "@/hooks/tanstackHooks/useCourse";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { NewBatch } from "./NewBatch";
import { Button } from "@/components/ui/button";
import { useBatchesOfCourse } from "@/hooks/tanstackHooks/useBatch";
import Loader from "@/components/ui/loader";
import { useAuth } from "@/Context/authContext";


function Batches({ data, subjects, setData }) {
  const [selected, setSelected] = useState([]);
  const [batch, setBatch] = useState([])
  const { mutate } = useUpdateCourse();
  const {user}=useAuth()
  const { data: batches, error, isLoading } = useBatchesOfCourse(data._id);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    subjects: [],
  });

  useEffect(() => {
    setFormData({ ...formData, ...data });
    setSelected([...data.subjects]);
  }, [data]);

  useEffect(() =>{
    if(batches?.data){
      setBatch(batches.data)
    }
  }, [batches])

  const currentDate = batches?.currentDate

  const handleUpdateCourse = () => {
    // if(formData.name === '')
    mutate(
      { formData, id: data._id },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast("Course updated", {
              description: "Course updated successfully",
            });
            setData(data.data);
            // handleCancel()
          } else {
            toast("Somthing went wrong", {
              description: data.message,
            });
            setError(data.message);
          }
        },
      }
    );
  };
  

  return (
    <div className="w-full border rounded-2xl overflow-hidden  ">
      <div className="w-full  py-8 md:px-6 border-b flex max-md:flex-col gap-3 md:items-end justify-between bg-primary-foreground px-4">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-primary mb-1">{data.name}</h1>
          <p className="text-gray-800 text-sm ">Category : <span className="font-medium">{data.category}</span></p>
          <p className="text-gray-800 text-sm ">Duration : <span className="font-medium">{data.duration}</span></p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant='outline' onClick={()=>setData(null)}>Back</Button>
          {user.isAdmin&& <AddCourse
            formData={formData}
            setFormData={setFormData}
            subject={subjects?.data}
            submit={handleUpdateCourse}
            type="edit"
            selected={selected}
            setSelected={setSelected}
          />}
        </div>
      </div>
      <div className="py-8 px-6 ">
        <div className="flex justify-between items-center mb-4 max-md:flex-col">
          <h1 className="text-xl font-semibold">Available batches</h1>
          {user.isAdmin && <NewBatch id={data._id} name={data.name} />}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="w-full h-full col-span-full">
              <Loader />
            </div>
          ) : error ? (
            <div>Error to load batches</div>
          ) : (
            batch?.map((item, i) => {
              const currentDate2 = new Date(currentDate);
              const startDate = new Date(item.startDate);
              const endDate = new Date(item.endDate);

              // Strip time (set to 00:00:00 for accurate date-only comparison)
              const currentDateOnly = new Date(
                currentDate2.getFullYear(),
                currentDate2.getMonth(),
                currentDate2.getDate()
              );

              const startDateOnly = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate()
              );

              const endDateOnly = new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate()
              );

              const isAdmissionOpened = 
                item.isAdmissionStarted && 
                (startDateOnly <= currentDateOnly && endDateOnly >= currentDateOnly);

                const isSceduled = startDateOnly > currentDateOnly
              return (
                <Card
                  onClick={() => setSelected(item)}
                  key={i}
                  className={`${
                    isAdmissionOpened && "border-green-600 bg-green-50"
                  } shadow-none`}
                >
                  <CardHeader className="relative">
                    <CardTitle >Batch No : {i + 1}</CardTitle>
                    {/* <CardDescription>{item._id}</CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col ">
                      <h1 className="text-2xl font-medium">{item.month} Batch</h1>
                      <div className="w-full mt-2 border-t pt-4 flex items-center justify-between">
                        <div>
                          <h1 className="font-medium">Admission Status</h1>
                          <p className="text-sm text-muted-foreground">
                            {isAdmissionOpened? "Admission Opened": isSceduled ? "Batch Scheduled" : "Admission Closed"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Batches;
