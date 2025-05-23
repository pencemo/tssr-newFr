"use client";

import * as React from "react";
import {
  Settings,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import logo from "../../../assets/Logo.svg";

import {
  Book02Icon,
  Bookmark03Icon,
  GraduateMaleIcon,
  Home04Icon,
  Mortarboard02Icon,
  Ticket03Icon,
  UserAdd01Icon,
} from "hugeicons-react";
import { NavMain } from "@/components/studycenterComponents/sideBar/nav-main";
import { NavProjects } from "@/components/studycenterComponents/sideBar/nav-projects";
import { NavUser } from "@/components/studycenterComponents/sideBar/nav-user";
import { TeamSwitcher } from "@/components/studycenterComponents/sideBar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

// This is sample data.
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
      title: "Students",
      url: "students",
      icon: GraduateMaleIcon,
    },
    {
      title: "Courses",
      url: "course",
      icon: Mortarboard02Icon,
    },
    {
      title: "Admission",
      url: "/studycenter/admission",
      icon: UserAdd01Icon,
      items: [
        {
          title: "Admission (Excel)",
          url: "/studycenter/admission/excel",
        },
      ],
    },
    
    {
      title: "Hall Ticket",
      url: "hallticket",
      icon: Ticket03Icon,
    },
    {
      title: "Results",
      url: "results",
      icon: Bookmark03Icon,
    },
    {
      title: "Marksheet",
      url: "marksheet",
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
      url: "#",
      icon: Settings,
    },
    {
      name: "Report",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                {/* <div>
                  <img className="w-32" src={logo} alt="" />
                </div> */}
                <div className="border p-0.5 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    className="w-full"
                    src={logo}
                    alt="StudyCenterLogo"
                  />
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
    </Sidebar>
  );
}
