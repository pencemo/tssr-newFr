import AllExams from "@/components/studycenterComponents/examComponents/AllExams";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useGetExamOfCenter } from "@/hooks/tanstackHooks/useExam";
import React from "react";
import { useNavigate } from "react-router-dom";

function CenterExams() {
  const { data, isError, error, isLoading } = useGetExamOfCenter();
  const navigete = useNavigate()

  if (isLoading) return <Loader />;
  if (isError || error) return <div>Error to fetch data</div>;

  return (
    <div>
      <div className="flex items-center justify-between pb-6 border-b mb-5">
        <h1 className="text-2xl font-bold ">Scheduled Exams</h1>
        <Button onClick={()=>navigete('/studycenter/examination/hallticket')}>Hall Ticket</Button>
      </div>
      {data?.data.length ? (
        <AllExams data={data?.data} />
      ) : (
        <div className="text-center  text-lg font-semibold">
          No Exams Scheduled
        </div>
      )}
    </div>
  );
}

export default CenterExams;
