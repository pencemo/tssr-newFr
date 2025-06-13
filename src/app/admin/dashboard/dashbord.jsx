import { AdminChart } from "@/components/admincomp/AdminDashbord/AdminChart";
import DataCard from "@/components/admincomp/AdminDashbord/DataCard";
import React from "react";
import logo from "../../../assets/logo.svg";
import NotificationCard from "@/components/studycenterComponents/Dashboard/NotificationCard";
import { useDashboardData } from "@/hooks/tanstackHooks/useNotifications";
import Loader from "@/components/ui/loader";

function Dashbord() {
  const {data, isLoading, isError, error}=useDashboardData()
  
  if(error || isError) return <div>error</div>
  if(isLoading) return <div className="w-full h-full"><Loader/></div>
  return (
    <div className="w-full h-full space-y-5">
      <div className="mb-5 w-full  ">
        <div className="flex  gap-5 items-center">
          <img src={logo} className="w-28" alt="" />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#253a7c]">TSSR Council</h1>
            <p className="text-muted-foreground">Task manage applicatin</p>
          </div>
        </div>
      </div>
      <DataCard data={data?.data} />
      <div className="grid md:grid-cols-8 gap-5">
        <div className="md:col-span-5">
          <AdminChart data={data?.data?.chart} />
        </div>
        <div className="md:col-span-3 h-full ">
          <NotificationCard />
          
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
