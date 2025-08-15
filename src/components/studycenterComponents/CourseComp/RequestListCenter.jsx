import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import NoData from "@/components/ui/noData";
import { useRequestCourseForCenter } from "@/hooks/tanstackHooks/useRequest";
import { format } from "date-fns";
import React from "react";

function RequestListCenter() {
  const { data, error, isLoading } = useRequestCourseForCenter();

  if (error) return <div className="w-full h-full ">Error</div>;
  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  return (
    <div className="mt-5">
      {data.data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {data?.data?.map((item, index) => {
            return (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <p className="text-sm font-semibold text-gray-500">Requested Course</p>
                  <CardTitle>{item?.courseId?.name}</CardTitle>
                  <CardDescription>
                    {format(new Date(item?.requestedDate), "PPP")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h1 className="text-sm text-muted-foreground">Status</h1>
                    <Badge variant={item?.status == 'pending' ? 'outline' : item?.status == 'approved' ? "default": 'destructive'} className='capitalize rounded-full'>{item?.status}</Badge>
                  </div>
                
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default RequestListCenter;
