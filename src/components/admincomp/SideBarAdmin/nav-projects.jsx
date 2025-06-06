import { useNotificationCount } from "@/Context/authContext";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

export function NavProjects({
  projects
}) {
  const { isMobile } = useSidebar()
  const {notificationCount}=useNotificationCount()
  return (
    (<SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Actions</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item, i) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton  asChild>
              <Link  to={item.url}>
                <item.icon />
                <span className="flex w-full justify-between items-center">
                {item.name}
                {i == 0 && notificationCount > 0 &&<div >
            <div className="text-white text-xs grid bg-red-500  rounded-full size-5 place-content-center animate-pulse">{notificationCount}</div>
            </div>}
                </span>
              </Link>
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}
