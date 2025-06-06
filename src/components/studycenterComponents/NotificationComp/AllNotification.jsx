import React, { useEffect } from "react";
import { NotificationIcon } from "./GetIcon";
import { useAllNotifications } from "@/hooks/tanstackHooks/useNotifications";
import Loader from "@/components/ui/loader";
import { format, formatDistanceStrict } from "date-fns";
import { Download04Icon, Link01Icon } from "hugeicons-react";
import { useNotificationCount } from "@/Context/authContext";

function AllNotification() {
  const { data, error, isLoading } = useAllNotifications();
  const {notificationCount, setNotificationCount}=useNotificationCount()

  useEffect(() => {
    const count = data?.data?.length || 0;
  
    const timer = setTimeout(() => {
      window.localStorage.setItem("notificationCount", count);
      setNotificationCount(0);
    }, 2500);
  
    // Return a function to clear the timer when component unmounts or `data` changes
    return () => clearTimeout(timer);
  }, [data]);

  if (error) return <div>error</div>;
  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  
  if(!data.data || data.data.length === 0) return <div className="w-full h-full flex items-center justify-center">No Notification</div>

  return (
    <div className="w-full h-full">
      <div className="flex flex-col  divide-y">
        {data?.data.map((item, i) => {
          const isNew = i+1 <= notificationCount;
          return (
            <div key={i} className="flex md:items-start max-md:flex-col gap-2 hover:bg-muted/40 px-2 py-5 ">
              <div className="space-y-1 flex gap-3  md:gap-6  relative  w-full">
              <NotificationIcon item={item.category} size={20} />
              {isNew &&<div className="absolute top-0 left-0 size-1.5 animate-ping bg-green-600 rounded-full"></div>}
                <div >
                  <h1 className="font-medium">{item?.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    {item?.description}
                  </p>
                  
                  <div>
                  {item?.attachedFileUrl && item?.attachedFileUrl !== "" && (
                    <a href={item?.attachedFileUrl} download={true} className="text-xs font-medium text-white mt-1 bg-primary  px-3 inline-flex items-center justify-center gap-1 rounded-md py-1 " >
                      <Download04Icon size={16}/>
                      Download
                    </a>
                  )}
                  </div>
                </div>
              </div>
                <div className="flex flex-col justify-between h-full items-end gap-3 text-nowrap">
                  
                  <p className="text-sm text-muted-foreground">{formatDistanceStrict(new Date(item?.createdAt || 0), new Date(), {addSuffix: true})}</p>
                </div>

                
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllNotification;
