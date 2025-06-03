import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderPending from '@/components/admincomp/StoreComp/orderPending';
import { useAllOrders } from '@/hooks/tanstackHooks/useOrder';
import OrderConfirmed from '@/components/admincomp/StoreComp/OrderConfirmed';
import OrderCancelled from '@/components/admincomp/StoreComp/OrderCancelled';
const Orders = () => {


  return (
    <div>
      <div className="w-full  flex justify-between max-sm:flex-col gap-2 items-center border-b pb-4">
        <h1 className="text-xl md:text-2xl font-bold">Manage Orders</h1>
      </div>
      <Tabs defaultValue="Active" className="w-full mt-5">
        <TabsList className="h-11 space-x-2 bg-transparent">
          <TabsTrigger
            className="bg-zinc-100 px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="Active"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            className="bg-zinc-100 px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="schedule"
          >
            Accepted
          </TabsTrigger>
          <TabsTrigger
            className="bg-zinc-100 px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="Closed"
          >
            Canceled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Active">
          <OrderPending  /> 
        </TabsContent>
        <TabsContent value="schedule">
          <OrderConfirmed />
        </TabsContent>
        <TabsContent value="Closed">
          <OrderCancelled />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Orders
