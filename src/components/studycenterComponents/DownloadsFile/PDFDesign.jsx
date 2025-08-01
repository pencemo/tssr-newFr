import React from "react";
import headerImg from "../../../assets/PdfHead.png"
import { format } from "date-fns";

const datas = {
  success: true,
  data: [
    {
      name: "Sadhin",
      year: 2025,
      enrolledDate: "2025-07-18T00:00:00.000Z",
      isCompleted: "Not Completed",
      isPassed: "Not Passed",
      batchMonth: "January",
      courseName: "Digital marketing",
      admissionNumber: "10551050",
    },
    {
      name: "Jabir",
      year: 2025,
      enrolledDate: "2025-07-18T00:00:00.000Z",
      isCompleted: "Not Completed",
      isPassed: "Not Passed",
      batchMonth: "January",
      courseName: "Digital marketing",
      admissionNumber: "10551050",
    },
    {
      name: "Kamal",
      year: 2025,
      enrolledDate: "2025-07-18T00:00:00.000Z",
      isCompleted: "Not Completed",
      isPassed: "Not Passed",
      batchMonth: "January",
      courseName: "Digital marketing",
      admissionNumber: "10551050",
    },
    {
      name: "Haseeb Ahmed Noor",
      year: 2025,
      enrolledDate: "2025-07-18T00:00:00.000Z",
      isCompleted: "Not Completed",
      isPassed: "Not Passed",
      batchMonth: "January",
      courseName: "Digital marketing",
      admissionNumber: "10551050",
    },
    {
      name: "Sadhin",
      year: 2025,
      enrolledDate: "2025-07-18T00:00:00.000Z",
      isCompleted: "Not Completed",
      isPassed: "Not Passed",
      batchMonth: "January",
      courseName: "Digital marketing",
      admissionNumber: "10551050",
    },
    {
      name: "muhammed niyas zadhin",
      year: 2025,
      enrolledDate: "2025-07-18T00:00:00.000Z",
      isCompleted: "Not Completed",
      isPassed: "Not Passed",
      batchMonth: "January",
      courseName: "Digital marketing",
      admissionNumber: "10551051",
    },
  ],
  studycenterName: "Knowledge city, Calicut kerala india",
  courseName: "Diploma in Digital marketing and E-commerce",
  batchMonth: "January",
  year: 2025,
};

const head = [
  "Attendan",
  "Assignment",
  "Seminar",
  "Internal Exam 1",
  "Internal Exam 2",
  "Total Mark",
];


function PDFDesign({ headers=head, marks, data=datas, date=false , name }) {
    
    const getStudents = () => {
        if(!data){
            return []
        }
        if (data?.data?.length >= 15) {
          return data?.data;
        }
        // If less than 15, pad the array with empty objects up to 15
        const students = data?.data || []
        while (students.length < 15) {
          students.push({});
        }
        return students;
      };

      const students = getStudents()

  return (
    <div className="w-[210mm] border h-[297mm] mx-auto p-8 ">
        <div className="border-t border-x border-black/70">
            <img src={headerImg} className="w-full" alt="" />
        </div>

        <div className="border grid grid-cols-12 border-black/70">
            <div className="col-span-4 border-r border-black/70 ">
                <h1 className="text-sm p-2.5 border-b border-black/70">Study Center Name</h1>
                <h1 className="text-sm p-2.5 border-b border-black/70">Course Name</h1>
                <h1 className="text-sm p-2.5 border-black/70">Batch and Year</h1>
            </div>
            <div className="col-span-8">
                <h1 className="text-sm font-medium p-2.5 border-b border-black/70">{data.studycenterName}</h1>
                <h1 className="text-sm font-medium p-2.5 border-b border-black/70">{data.courseName}</h1>
                <h1 className="text-sm font-medium p-2.5 border-black/70">{data.batchMonth}, {data.year}</h1>
            </div>
        </div>

        <div className="w-full flex items-center justify-center mt-6">
            <h1 className="uppercase text-2xl font-bold">{name ||"Internal Mark"}</h1>
        </div>

        {/* table and rows  */}
      <div className="border mt-6 border-black/70 rounded-xl overflow-hidden">
        <div
          className={`w-full grid grid-cols-12 border-b border-black/70 bg-[#e5e7eb]`} //text-white bg-[#253a7c]
        >
          <div className="col-span-1 border-r border-black/70 p-2.5">
            <h1 className="text-sm font-medium ">No</h1>
          </div>
          <div className="col-span-2 border-r border-black/70 p-2.5">
            <h1 className="text-sm font-medium ">Admissinon No</h1>
          </div>
          <div className="col-span-2 border-r border-black/70 p-2.5">
            <h1 className="text-sm font-medium ">Name</h1>
          </div>
          <div
            className={`col-span-7 grid `}
            style={{
              gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
            }}
          >
            {headers.map((item, index) => {
              const isLast = index === headers.length - 1;
              return (
                <div
                  key={index}
                  className={`col-span-1 ${
                    !isLast && "border-r"
                  } border-black/70 py-2`}
                >
                  <h1 className="text-xs font-medium text-center">{item}</h1>
                </div>
              );
            })}
          </div>
        </div>
        {marks&&<div className={`w-full grid grid-cols-12 border-b border-black/70 `}>
          <div className="col-span-1 border-r text-center border-black/70 p-1.5">
            <h1 className="text-sm font-medium ">-</h1>
          </div>
          <div className="col-span-2 border-r border-black/70 p-1.5">
            <h1 className="text-sm font-medium ">-</h1>
          </div>
          <div className="col-span-2 border-r border-black/70 p-1.5">
            <h1 className="text-sm font-medium ">Mark</h1>
          </div>
          <div
            className={`col-span-7 grid `}
            style={{
              gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
            }}
          >
            {marks?.map((item, index) => {
              const isLast = index === headers.length - 1;
              return (
                <div
                  key={index}
                  className={`col-span-1 ${
                    !isLast && "border-r"
                  } border-black/70 p-1.5`}
                >
                  <h1 className="text-xs font-medium text-center">{item}</h1>
                </div>
              );
            })}
          </div>
        </div>}
        {date&&<div className={`w-full grid grid-cols-12 border-b border-black/70 `}>
          <div className="col-span-1 border-r text-center border-black/70 p-1.5">
            <h1 className="text-sm font-medium ">-</h1>
          </div>
          <div className="col-span-2 border-r border-black/70 p-1.5">
            <h1 className="text-sm font-medium ">-</h1>
          </div>
          <div className="col-span-2 border-r border-black/70 p-1.5">
            <h1 className="text-sm font-medium ">Date</h1>
          </div>
          <div
            className={`col-span-7 grid `}
            style={{
              gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
            }}
          >
            {headers.map((_item, index) => {
              const isLast = index === headers.length - 1;
              return (
                <div
                  key={index}
                  className={`col-span-1 ${
                    !isLast && "border-r"
                  } border-black/70 p-1.5`}
                >
                  <h1 className="text-xs font-medium text-center"></h1>
                </div>
              );
            })}
          </div>
        </div>}
        {students?.map((item, index, array) => {
          const rowLast = index === array.length - 1;
          return (
            <div
              className={`w-full grid grid-cols-12 ${
                !rowLast && "border-b"
              } border-black/70 `}
            >
              <div className="col-span-1 border-r text-center border-black/70 p-1.5">
                <h1 className="text-sm font-medium">{index + 1}</h1>
              </div>
              <div className="col-span-2 border-r border-black/70 p-1.5">
                <h1 className="text-sm ">{item.admissionNumber}</h1>
              </div>
              <div className="col-span-2 border-r border-black/70 p-1.5">
                <h1 className="text-sm ">{item.name}</h1>
              </div>
              <div
                className={`col-span-7 grid `}
                style={{
                  gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
                }}
              >
                {headers.map((item, index) => {
                  const isLast = index === headers.length - 1;
                  return (
                    <div
                      key={index}
                      className={`col-span-1 ${
                        !isLast && "border-r"
                      } border-black/70 p-1.5`}
                    >
                      <h1 className="text-xs text-center"></h1>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground">
        For administrative purposes only - Printed as of {format(new Date(), 'PPP')}
        </p>
      </div>
    </div>
  );
}

export default PDFDesign;
