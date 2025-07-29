import FileDownload from "@/components/studycenterComponents/DownloadsFile/FileDownload";
import { DocDownload } from "@/components/studycenterComponents/DownloadsFile/DocDownload";
import React from "react";

function DownloadFiles() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Documents for Download</h1>
        {/* <p className="text-sm text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi labore atque nostrum perspiciatis cupiditate, at, dolorum molestiae dolor inventor</p> */}
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
      <FileDownload
        title="Attendance Register"
        desc="Download the attendance register for the current semester"
        icon=''
        comp={
          <DocDownload
            name="Attendance Register"
            date={true}
            fields={[
              "Subject 1",
              "Subject 2",
              "Subject 3",
              "Subject 4",
              "Subject 5",
              "Subject 6",
              "Online / Offline",
            ]}
          />
        }
      />
      <FileDownload
        title="Attendence Report"
        desc="Download the Attendence Report for the current semester"
        comp={
          <DocDownload
            name="Attendence Report"
            fields={[
              "Working  Days",
              "Present",
              "Percentage",
              "Mark",
            ]}
          />
        }
      />
      <FileDownload
        title="Internal Mark"
        desc="Download the Internal Mark for the current semester"
        comp={
          <DocDownload
            mark={[4,4,4,4,4,20]}
            name="Internal Mark"
            fields={[
              "Attendance",
              "Assignment",
              'Seminar',
              "Internal Exam 1",
              "Internal Exam 2",
              "Total Mark",
            ]}
          />
        }
      />
      <FileDownload
        title="Reports"
        desc="Download the Reports for the current semester"
        comp={
          <DocDownload
            mark={[25,25,25,25,100]}
            name="Reports"
            fields={[
              "Camp",
              "Tour",
              'Fest',
              "Social Work",
              "Total Mark",
            ]}
          />
        }
      />
    </div>
    </div>
  );
}

export default DownloadFiles;
