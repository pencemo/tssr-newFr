


import React, { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import header from "../../../assets/pdfHead.svg";
import logo from "../../../assets/logo.svg";
import {
  Printer,
} from "lucide-react";
import { format } from "date-fns";
import { formateDateToIST } from "@/lib/formateDate";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const StudyCentrPDF = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white px-3 rounded-2xl max-w-3xl mx-auto min-h-screen"
    >
      <div className="pb-5 border-b-2 border-black/60">
        <img src={header} alt="" />
      </div>

<div>
<div className="p-8  ">
        {/* Header */}
        <div className="text-center   pb-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">STUDY CENTER CERTIFICATE</h1>
          <p className=" text-gray-600">Authorized Training Center Registration Details</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Center Information */}
          <div className="bg-gray-50 p-6 rounded-lg print:bg-gray-100">
            {/* <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">CENTER INFORMATION</h2> */}

            <div className="grid grid-cols-1 gap-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{data.name}</h3>
                <p className="text-lg text-gray-600">
                  ATC ID: <span className="font-semibold">{data.atcId}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Registration Number
                    </span>
                    <span className="text-lg font-semibold text-gray-800">{data.regNo}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Center Head</span>
                    <span className="text-lg font-semibold text-gray-800">{data.centerHead}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</span>
                    <span className="text-lg font-semibold text-gray-800">{data.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone Number</span>
                    <span className="text-lg font-semibold text-gray-800">{data.phoneNumber}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Location</span>
                    <span className="text-lg font-semibold text-gray-800">{data.place}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">District & State</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {data.district.toUpperCase()}, {data.state.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pincode</span>
                  <span className="text-lg font-semibold text-gray-800">{data.pincode}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Renewal Date</span>
                  <span className="text-lg font-semibold text-gray-800">{formatDate(data.renewalDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Information */}
          {/* <div className="grid grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Approval Status</h3>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${data.isApproved ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className={`font-medium ${data.isApproved ? "text-green-700" : "text-red-700"}`}>
                  {data.isApproved ? "APPROVED" : "NOT APPROVED"}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Active Status</h3>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${data.isActive ? "bg-green-500" : "bg-orange-500"}`}></div>
                <span className={`font-medium ${data.isActive ? "text-green-700" : "text-orange-700"}`}>
                  {data.isActive ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>
            </div>
          </div> */}

          {/* Registration Details */}
          <div className="bg-gray-50 p-6 rounded-lg print:bg-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Registration Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Created Date:</span>
                <span className="ml-2 font-medium">{formatDate(data.createdAt)}</span>
              </div>
              <div>
                <span className="text-gray-500">Last Updated:</span>
                <span className="ml-2 font-medium">{formatDate(data.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              This certificate is issued by the TSSR Council 
            </p>
            <p className="text-xs text-gray-500">
              Generated on: {new Date().toLocaleDateString("en-IN")} | Certificate ID: {data._id}
            </p>
          </div>
        </div>
      </div>
</div>
     

    
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <img className="w-60" src={logo} alt="" />
      </div>
    </div>
  );
});

export default function CenterPDF({ data }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    contentRef: componentRef,
    documentTitle: `StudyCenter`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.3in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  });
  return (
      <div className="">
        <div className=" ">
          <Button    onClick={handlePrint}>
            <Printer className="w-5 h-5 " />
            Print Data
          </Button>
        </div>
        <div className="bg-white rounded-lg sr-only shadow-2xl overflow-hidden">
          <StudyCentrPDF ref={componentRef} data={data} />
        </div>
      </div>
  );
}
