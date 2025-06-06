import { useNotificationCount } from "@/Context/authContext"
import { AppSidebar } from "@/components/admincomp/SideBarAdmin/app-sidebar"
import { NewNotifications } from "@/components/studycenterComponents/NotificationComp/NewNotifications"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Page() {
   const {notificationCount}=useNotificationCount()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 justify-between px-5 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink to="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="relative">
            <NewNotifications/>
            {notificationCount > 0 &&<div className="absolute -top-1.5 -right-1.5 ">
            <div className="text-white text-xs grid bg-red-500  rounded-full size-5 place-content-center animate-pulse">{notificationCount}</div>
            </div>}
          </div>
        </header>
        <div className="max-w-[95rem] mx-auto  px-4 md:px-8 py-6 w-full h-full ">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
