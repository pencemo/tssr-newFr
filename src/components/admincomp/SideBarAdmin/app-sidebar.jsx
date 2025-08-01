import * as React from "react"
import {
  Settings ,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import logo from "../../../assets/Logo.svg"

import { NavMain } from "@/components/admincomp/SideBarAdmin/nav-main"
import { NavProjects } from "@/components/admincomp/SideBarAdmin/nav-projects"
import { NavSecondary } from "@/components/admincomp/SideBarAdmin/nav-secondary"
import { NavUser } from "@/components/admincomp/SideBarAdmin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book02Icon, Bookmark03Icon, FileDownloadIcon, GraduateMaleIcon, Home04Icon, Image02Icon, InformationSquareIcon, Mortarboard02Icon, NoteEditIcon, Notification03Icon, Settings02Icon, Ticket03Icon, UserAdd01Icon, UserMultipleIcon } from "hugeicons-react"
import { Link } from "react-router-dom"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "",
      icon: Home04Icon,
    },
    {
      title: "Study Centre",
      url: "studycentre",
      icon: Book02Icon,
      items: [
        {
          title: "Add Centre",
          url: "studycentre/add",
        },
        {
          title: "Requests",
          url: "studycentre/req",
        },
      ],
    },
    {
      title: "Courses",
      url: "course",
      icon: Mortarboard02Icon,
      items: [
        {
        title: "Subjects",
        url: "course/subjects",
      },
        {
        title: "Requests",
        url: "course/request",
      },
    ]
      
    },
    {
      title: "Admission",
      url: "admission",
      icon: UserAdd01Icon,
      
    },
    {
      title: "Students",
      url: "students",
      icon: GraduateMaleIcon,
      items:[
        {
          title: "Verification",
          url: "/admin/students/verification",
        }
      ]
      
    },
    {
      title: "Examination",
      url: "examination",
      icon: NoteEditIcon,
      
    },
    {
      title: "Manage Staff",
      url: "staff", 
      icon: UserMultipleIcon,
      
    },
    {
      title: "Downloads",
      url: "downloads", 
      icon: FileDownloadIcon, 
      
    },
    // {
    //   title: "Results",
    //   url: "results",
    //   icon: Bookmark03Icon,
      
    // },
    {
      title: "Gallery",
      url: "gallery",
      icon: Image02Icon, 
      
    },
    {
      title: "TSSR Store",
      url: "orders",
      icon: Settings2,
      items: [
        {
          title: "Products",
          url: "orders/products",
        }
      ]
      
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Notification",
      url: "notification",
      icon: Notification03Icon,
    },
    {
      name: "Settings",
      url: "settings",
      icon: Settings02Icon,
    },
    
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar variant="inset"  {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                {/* <div>
                  <img className="w-32" src={logo} alt="" />
                </div> */}
                <div
                  className="border p-0.5 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img className="w-full" src={logo} alt="" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">TSSR </span>
                  <span className="truncate text-xs">Council</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
