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
import { Book02Icon, Bookmark03Icon, GraduateMaleIcon, Home04Icon, Mortarboard02Icon, NoteEditIcon, Ticket03Icon, UserAdd01Icon } from "hugeicons-react"
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
          title: "Requests",
          url: "studycentre/req",
        },
        {
          title: "Add Study Centre",
          url: "studycentre/add",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Courses",
      url: "course",
      icon: Mortarboard02Icon,
      
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
      
    },
    {
      title: "Examination",
      url: "examination",
      icon: NoteEditIcon,
      
    },
    {
      title: "Results",
      url: "results",
      icon: Bookmark03Icon,
      
    },
    {
      title: "TSSR Store",
      url: "store",
      icon: Settings2,
      
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
      name: "Settings",
      url: "settings",
      icon: Settings,
    },
    {
      name: "Report",
      url: "#",
      icon: PieChart,
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
